const express = require('express');
const bodyParser = require('body-parser');
const openaiConnection = require('./openAI'); 

const app = express();

const chatGPT = new openaiConnection("");


app.use(bodyParser.json());

// Define static questions
const staticQuestions = [
    "Hi there, Let's find a book that matches your interests! Which genres do you enjoy most as an avid reader?",
    "If asked, what are your all-time favorite books?",
    "When it comes to character engagement, what kind of characters do you prefer in stories?",
    "Do you tend to get exhausted after a certain number of pages? If so, what's your typical limit? ",
    "What mood are you looking for in the next book you read?",
    "Are there any specific themes or topics you have in mind for your next read?",
    "Do you have any specific dislikes or elements you prefer to avoid in your reading?",
    "What else would you like me to know about your reading preferences or what you're looking for in your next book?",
    "Hang on while I find some suggestions for your next read!"
];

// Initialize question index
let questionIndex = 0;

async function analyzeResponseWithGPT(userResponse, questionAsked) {
    const promptDirectReply = `Considering the user's response: '${userResponse}', did the user  respond to the question '${questionAsked}'? 
    Please respond with 'Yes' if the user's response acknowledges the question, even if it lacks specific details. 
    If the response provides relevant information, respond with 'Yes' as well. 
    If the user response is completely unrelated or unclear, respond with 'No'. 
    If the user wants to skip the question, respond with 'Yes'.`;
    
    
    const responseDirectReply = await chatGPT.ask(promptDirectReply);
    console.log("Response Direct Reply:", responseDirectReply);
    return{responseDirectReply};
}

function aRstartConversation(req, res) {
    questionIndex = 0;
    res.json({ question: staticQuestions[questionIndex] });
}

async function aRgenerateResponse(req, res) {
    const { userResponse, questionAsked, questionIndex } = req.body;

    // Check if questions have been asked before
    let nextQuestionIndex = questionIndex ? parseInt(questionIndex) : 0;
    let questionToAsk = questionAsked;

    // Analyze the user response using GPT-3.5
    const responseDirectReplyPromise = analyzeResponseWithGPT(userResponse, questionAsked);
    const responseDirectReply = await responseDirectReplyPromise;

    if (responseDirectReply.responseDirectReply.toLowerCase() === 'yes') {
        const promptEngagingReply = `Reviewing the user's response: '${userResponse}', to the question: "${questionAsked}", Generate a response to the user based on their answer. The response should be engaging and should not include any follow-up questions. (use less than 30 words) Use a friendly tone and tailor the response to the user's input generate only a response, do not ask any follow-up question from the user , do not give any recommendations.This is a continuing conversation, so generate response likewise`;
        const response = await chatGPT.ask(promptEngagingReply);
    
            // Code for generating response
        nextQuestionIndex++; // Increment the question index
        
            // Check if there are more questions to ask
        if (nextQuestionIndex < staticQuestions.length) {
                questionToAsk = staticQuestions[nextQuestionIndex]; // Update the question to ask
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
        If the user's response includes any subquestions rabout the question asked : ' ${questionAsked}' , provide helpful response. 
        If a subquestion isn't related to '${questionAsked}', or if user response is not understandable provide a response saying answer is not matcing with the question in an engaging way,  but dont include any follow-up questions. (Use less than 20 words)`;
        
        const response = await chatGPT.ask(promptSubquestionCheck);
        res.json({
            question: questionToAsk,
            response,
            questionIndex: nextQuestionIndex
        });
    }
}

async function aRgenerateRecommendation(req, res) {
    const { messages } = req.body;
    
    // Collect all user messages (questions and answers)
    const prompt = messages.map(msg => msg.text).join('\n');
    
    try {
        // Send the prompt to the GPT model to generate a recommendation
        const promptRecommendation= `These are the answers given by avid readers to a book recommendation system '${prompt}', analyze user answers and give concise book recommendations with titles, authors, and very brief descriptions. Limit recommendations to a maximum of 4 books. `;
        const recommendation = await chatGPT.ask(promptRecommendation);
        
        // Return the recommendation to the frontend
        res.json({ recommendation });
    } catch (error) {
        console.error('Error generating recommendation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    aRstartConversation,
    aRgenerateResponse,
    aRgenerateRecommendation

};