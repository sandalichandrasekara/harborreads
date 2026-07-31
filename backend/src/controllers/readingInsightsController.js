const ReadingSights = require ('../models/readingInsights');
const wantToReadInsights= require('../models/readingInsightsWTR');

exports.getNumberOfReadBooks = async (req, res) => {
    const { username } = req.body;
    console.log(username);
  
    try {
      let readingSights = await ReadingSights.findOne({ username });
  
      if (!readingSights) {
        // Create a new ReadingSights document with default values
        readingSights = new ReadingSights({
          username,
          numberOfReadBooks: 0
        });
        await readingSights.save();
      }
      console.log({ numberOfReadBooks: readingSights.numberOfReadBooks });
  
      res.json({ numberOfReadBooks: readingSights.numberOfReadBooks });
  
    } catch (error) {
      console.error('Error fetching number of read books:', error);
      res.status(500).json({ error: 'Failed to fetch number of read books' });
    }
  };

  exports.getWTRBooks = async (req, res) => {
    const { username } = req.body;
  
    try {
      let wtr = await wantToReadInsights.findOne({ username });
  
      if (!wtr) {
        // Create a new ReadingSights document with default values
        wtr = new wantToReadInsights({
          username,
          wantTooReadBooks: 0
        });
        await wtr.save();
      }
  
      res.json({ wantTooReadBooks: wtr.wantTooReadBooks });
  
    } catch (error) {
      console.error('Error fetching number of want to read books:', error);
      res.status(500).json({ error: 'Failed to fetch number of want to read books' });
    }
  };

  exports.setWTRBooks = async (req, res) => {
    const { username, wantTooReadBooks } = req.body;
    console.log( username, wantTooReadBooks );
  
    try {
      let wtr = await wantToReadInsights.findOne({ username });
  
      if (!wtr) {
        // Create a new wantToReadInsights document with default values
        wtr = new wantToReadInsights({
          username,
          wantTooReadBooks: 0
        });
      }
  
      // Update the number of "want to read" books
      wtr.wantTooReadBooks = wantTooReadBooks;
      await wtr.save();
  
      res.json({ wantTooReadBooks: wtr.wantTooReadBooks });
  
    } catch (error) {
      console.error('Error setting number of want to read books:', error);
      res.status(500).json({ error: 'Failed to set number of want to read books' });
    }
  };