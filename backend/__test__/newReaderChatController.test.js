//Test case file for chat controllers

const {nRstartConversation, nRgenerateResponse, nRgenerateRecommendation } = require('../src/controllers/chatController/newReadersChatController');
const OpenAIConnection = require('../src/controllers/chatController/openAI');

//static questions
const staticQuestions = [
    "Hi there, Let's find a book that matches your interests! Which genre are you interested in? (e.g., mystery, fantasy) mystery, fantasy, romance, or science fiction?",
    "let's add a personal touch to your reading experience. Is there a particular hobby, interest, or life experience you'd love to see reflected in the books you read?",
    "Let's explore what themes spark your curiosity. What topics or themes are you eager to dive into as you dive into the world of books?",
    "Books have the power to evoke a wide range of emotions, from laughter and joy to tears and heartache. What emotional journey are you prepared to embark on? Are you seeking excitement, warmth, suspense, or deep reflection?",
    "What kind of characters do you enjoy reading about? Heroes on epic quests, underdogs overcoming challenges, or relatable everyday people facing extraordinary circumstances?",
    "Do you have any specific dislikes or elements you prefer to avoid in your reading?",
    "Hang on while I find some suggestions for your next read!"
];

//openai connection
const chatGPT = new OpenAIConnection('open-ai-key');

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

jest.mock('../src/controllers/chatController/openAI', () => {
    return jest.fn().mockImplementation(() => {
        return {
            ask: jest.fn().mockResolvedValue('Mocked response from GPT')
        };
    });
});

describe('Chat Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    //test case 1 - checks if it ruturns the first static question
    describe('nRstartConversation', () => {
        it('should return the first static question', () => {
            nRstartConversation(req, res);
            expect(res.json).toHaveBeenCalledWith({ question: staticQuestions[0] });
        });
    });

    
    describe('nRgenerateResponse', () => {
        //test case 2 - checks if it generated a response based on user imput
        it('should generate a response based on user input', async () => {
            req.body = {
                userResponse: 'User response',
                questionAsked: 'Question',
                questionIndex: 0
            };

            await nRgenerateResponse(req, res);

            expect(res.json).toHaveBeenCalled();
            expect(res.json.mock.calls[0][0].response).toEqual('Mocked response from GPT');
        });

        //test case 2 - checks if it ghandle user response not acknowledging the question
        it('should handle user response not acknowledging the question', async () => {
            // Arrange
        const userResponse = 'I like fantasy books';
        const questionAsked = 'Hi there, Let\'s find a book that matches your interests! Which genre are you interested in? (e.g., mystery, fantasy) mystery, fantasy, romance, or science fiction?';

        // Act
        const result = await analyzeResponseWithGPT(userResponse, questionAsked);

        // Assert
        expect(result.responseDirectReply.toLowerCase()).toBe('mocked response from gpt');
        });
    });

    describe('nRgenerateRecommendation', () => {
        //test case 3 - checks if it generates recs based on user messages
        it('should generate book recommendations based on user messages', async () => {
            req.body = {
                messages: [
                    { text: 'Message 1' },
                    { text: 'Message 2' },
                    { text: 'Message 3' }
                ]
            };

            await nRgenerateRecommendation(req, res);

            expect(res.json).toHaveBeenCalled();
            expect(res.json.mock.calls[0][0].recommendation).toEqual('Mocked response from GPT');
        });

        //test case 4- checks if it handles errors when generating recs
        it('should handle errors when generating recommendations', async () => {
            req.body = {
                messages: [
                    { text: 'Message 1' },
                    { text: 'Message 2' },
                    { text: 'Message 3' }
                ]
            };

            jest.spyOn(chatGPT, 'ask').mockRejectedValue(new Error('Mocked error'));

            await nRgenerateRecommendation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
});
