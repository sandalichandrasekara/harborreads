const express = require('express');
const bodyParser = require('body-parser');
const openaiConnection = require('./openAI'); 

const app = express();
const chatGPT = new openaiConnection("");

app.use(bodyParser.json());

// Define static questions
const staticQuestions = [
    "Hey there! 📚 Ready to dive into a book review? Share with me the title of a book you've recently read, and let's discuss it together!",
    "How would you describe your overall experience with the book in just a few words?",
    "Did any character surprise you with their development or actions?",
    "What specific scene or dialogue from the story resonated with you the most? If so, why did it stand out to you?",
    "What themes or messages did you take away from ? ",
    "If someone asked you if they should read this book, what would you say and why ? ",
    "It's been great chatting with you about your book! 🌟 Thank you for sharing your thoughts and insights. If you ever want to chat about books again or need recommendations, feel free to stop by. Happy reading! 📖😊"

];

// Initialize question index
let questionIndex = 0;

async function analyzeResponseWithGPT(userResponse, questionAsked) {
    const promptDirectReply = `Considering the user's response: '${userResponse}', did the user respond to the question '${questionAsked}'? 
    Please respond with 'Yes' if the user's response acknowledges the question, even if it lacks specific details. 
    If the response provides relevant information, respond with 'Yes' as well. 
    If the user response is completely unrelated or unclear, respond with 'No'. 
    If the user wants to skip the question, respond with 'Yes'.`;
    
    
    const responseDirectReply = await chatGPT.ask(promptDirectReply);
    console.log("Response Direct Reply:", responseDirectReply);
    return{responseDirectReply};
}

function bookChatStartConversation(req, res) {
    questionIndex = 0;
    res.json({ question: staticQuestions[questionIndex] });
}

async function bookChatGenerateResponse(req, res) {
    const { userResponse, questionAsked, questionIndex } = req.body;

    // Check if questions have been asked before
    let nextQuestionIndex = questionIndex ? parseInt(questionIndex) : 0;
    let questionToAsk = questionAsked;

    // Analyze the user response using GPT-3.5
    const responseDirectReplyPromise = analyzeResponseWithGPT(userResponse, questionAsked);
    const responseDirectReply = await responseDirectReplyPromise;

    if (responseDirectReply.responseDirectReply.toLowerCase() === 'yes') {
            
        if (nextQuestionIndex === 0) {
            bookTitle = userResponse;
        }
        const promptEngagingReply = `Given the user's reply: '${userResponse}' to the question: "${questionAsked}", respond engagingly and very briefly to the users response. and then create a Review for ''${bookTitle}' review should be for the question: '${questionAsked}', the generated review should start by saying my review on this is , make sure to give a different perspective to users , keep the review less than 50 words,  No follow-up questions or recommendations. Act as a book reviewing chatbot , `;
        const response = await chatGPT.ask(promptEngagingReply);
    
            // Code for generating response
        nextQuestionIndex++; // Increment the question index
        
            // Check if there are more questions to ask
        if (nextQuestionIndex < staticQuestions.length) {
                questionToAsk = staticQuestions[nextQuestionIndex]; // Update the question to ask
        
        } else {
            // If it's the last question, send a closing message and end the conversation
            return res.json({ message: "Thank you for the conversation! Have a great day!" });
        }
         console.log(questionToAsk);
        
            // Respond with the next question along with the chatbot's response
        res.json({
                response: response,
                question: questionToAsk, // Include the next question
                questionIndex: nextQuestionIndex
        });
       
            
    }else {
        const promptSubquestionCheck = `Reviewing the user's response: '${userResponse}' to the question: '${questionAsked}'. 
        If the user's response includes any subquestions about the question asked : ' ${questionAsked}' , provide helpful response. 
        If a subquestion isn't related to '${questionAsked}' or if user response is not understandable, provide a response saying answer is not matching with the question in an engaging way,  but dont include any follow-up questions. (Use less than 70 words)`;
        
        const response = await chatGPT.ask(promptSubquestionCheck);
        res.json({
            question: questionToAsk,
            response,
            questionIndex: nextQuestionIndex
        });
    }
}

module.exports = {
    bookChatStartConversation,
    bookChatGenerateResponse,

};