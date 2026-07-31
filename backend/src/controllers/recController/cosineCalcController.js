const { MongoClient } = require('mongodb');
const natural = require('natural');
const { TfIdf } = natural;

// Create a TfIdf instance
const tfidf = new TfIdf();
async function connectToMongoDB() {
    const uri = 'mongodb+srv://HarborReads:MongoDB%40HR12@cluster0.nhckanx.mongodb.net/harborreads?retryWrites=true&w=majority'; // Your MongoDB connection URI
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
  
      const database = client.db('harborreads');
      const collection = database.collection('metadata');
  
      const cursor = collection.find({});
  
      const bookDescriptions = [];
      await cursor.forEach(book => {
        const title = book.title;
        const description = book.description;
        
        // Add the title and description to the TfIdf instance
        tfidf.addDocument(`${title} ${description}`);
        bookDescriptions.push({ title, description });
      });
  
      return bookDescriptions;
  
    } finally {
      await client.close();
    }
  }
  
  async function getBestMatch(req, res) {
    // User conversation from request body
    const userConversation = req.body.conversation;
    console.log(userConversation);
  
    // Calculate TF-IDF vector for the user's conversation
    const userTfidf = new TfIdf();
    userTfidf.addDocument(userConversation);
  
    // Get all book descriptions from the MongoDB collection
    const bookDescriptions = await connectToMongoDB();
  
    // Calculate cosine similarity between user's TF-IDF vector and each book's TF-IDF vector
    const similarities = bookDescriptions.map((bookDescription) => {
      const bookTfidf = new TfIdf();
      bookTfidf.addDocument(bookDescription.description);
  
      const terms = {};
      userTfidf.listTerms(0).forEach((term) => {
        terms[term.term] = term.tfidf;
      });
  
      const vec1 = terms;
      const vec2 = {};
      bookTfidf.listTerms(0).forEach((term) => {
        vec2[term.term] = term.tfidf;
      });
  
      return cosineSimilarity(vec1, vec2);
    });
  
    // Get the index of the most similar book
    const bestMatchIndex = similarities.indexOf(Math.max(...similarities));
    const bestMatchBook = bookDescriptions[bestMatchIndex];
    console.log(Math.max(...similarities));
    console.log("Best match index:", bestMatchIndex);
  
    res.json({ bestMatchBook });
  }
  
  // Calculate cosine similarity
  function cosineSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let normVec1 = 0;
    let normVec2 = 0;
  
    for (const term in vec1) {
      if (vec2[term]) {
        dotProduct += vec1[term] * vec2[term];
      }
      normVec1 += vec1[term] ** 2;
    }
  
    for (const term in vec2) {
      normVec2 += vec2[term] ** 2;
    }
  
    const similarity = dotProduct / (Math.sqrt(normVec1) * Math.sqrt(normVec2));
    return similarity;
  }
  
  module.exports = { getBestMatch,connectToMongoDB };
  