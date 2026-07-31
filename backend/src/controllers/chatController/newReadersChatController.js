const express = require('express');
const bodyParser = require('body-parser');
const openaiConnection = require('./openAI'); 

const app = express();
const chatGPT = new openaiConnection("");

app.use(bodyParser.json());

// Define static questions
const staticQuestions = [
    "Hi there, Let's find a book that matches your interests! Which genre are you interested in? (e.g., mystery, fantasy) mystery, fantasy, romance, or science fiction?",
    "let's add a personal touch to your reading experience. Is there a particular hobby, interest, or life experience you'd love to see reflected in the books you read?",
    "Let's explore what themes spark your curiosity. What topics or themes are you eager to dive into as you dive into the world of books?",
    "Books have the power to evoke a wide range of emotions, from laughter and joy to tears and heartache. What emotional journey are you prepared to embark on? Are you seeking excitement, warmth, suspense, or deep reflection?",
    "What kind of characters do you enjoy reading about? Heroes on epic quests, underdogs overcoming challenges, or relatable everyday people facing extraordinary circumstances?",
    "Do you have any specific dislikes or elements you prefer to avoid in your reading?",
    "Hang on while I find some suggestions for your next read!"
];

// Initialize question index
let questionIndex = 0;

async function analyzeResponseWithGPT(userResponse, questionAsked) {
    const promptDirectReply = `Considering the user's response: '${userResponse}', did the user respond to the question '${questionAsked}'? 
    Please respond with 'Yes' if the user's response acknowledges the question, even if it lacks specific details. 
    If the response provides a completely relevant  information or slightly relavant response, respond with 'Yes'. 
    If the user response is completely unrelated or unclear, respond with 'No'. 
    If the user wants to skip the question, respond with 'Yes'.`;
    
    
    const responseDirectReply = await chatGPT.ask(promptDirectReply);
    console.log("Response Direct Reply:", responseDirectReply);
    return{responseDirectReply};
}

function nRstartConversation(req, res) {
    questionIndex = 0;
    res.json({ question: staticQuestions[questionIndex] });
}

async function nRgenerateResponse(req, res) {
    const { userResponse, questionAsked, questionIndex } = req.body;

    // Check if questions have been asked before
    let nextQuestionIndex = questionIndex ? parseInt(questionIndex) : 0;
    let questionToAsk = questionAsked;

    // Analyze the user response using GPT-3.5
    const responseDirectReplyPromise = analyzeResponseWithGPT(userResponse, questionAsked);
    const responseDirectReply = await responseDirectReplyPromise;

    if (responseDirectReply.responseDirectReply.toLowerCase() === 'yes') {
        const promptEngagingReply = `Given the user's reply: '${userResponse}' to the question: "${questionAsked}", respond engagingly as a chatbot, . (Under 20 words) No follow-up questions or recommendations. This is a continuing conversation.`;
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
        If the user's response includes any subquestions about the question asked : ' ${questionAsked}' , provide helpful response. 
        If a subquestion isn't related to '${questionAsked}' or if user response is not understandable, provide a response saying answer is not matching with the question in an engaging way,  but dont include any follow-up questions. (Use less than 20 words)`;
        
        const response = await chatGPT.ask(promptSubquestionCheck);
        res.json({
            question: questionToAsk,
            response,
            questionIndex: nextQuestionIndex
        });
    }
}

async function nRgenerateRecommendation(req, res) {
    const { messages } = req.body;
    
    // Collect all user messages (questions and answers)
    const prompt = messages.map(msg => msg.text).join('\n');
    
    try {
        // Send the prompt to the GPT model to generate a recommendation
        const promptRecommendation= `These are the answers given by new readers who are new to books  to a book recommendation system to get book recommendations:  '${prompt}', analyze these user answers and give concise book recommendations with titles, authors, and very brief descriptions. Limit recommendations to a maximum of 4 books. `;
        const recommendation = await chatGPT.ask(promptRecommendation);
        
        // Return the recommendation to the frontend
        res.json({ recommendation });
    } catch (error) {
        console.error('Error generating recommendation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    nRstartConversation,
    nRgenerateResponse,
    nRgenerateRecommendation

};