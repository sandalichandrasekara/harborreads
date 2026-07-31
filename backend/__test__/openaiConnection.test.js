//this test files does unit testing for the open ai connection
const axios = require('axios');
const OpenAIConnection = require('../src/controllers/chatController/openAI');

jest.mock('axios');

describe('OpenAIConnection', () => {
    let openaiConnection;

    beforeEach(() => {
        openaiConnection = new OpenAIConnection('open-ai-key');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('ask method', () => {
        //test case 1
        it('should return a response from the OpenAI API', async () => {
            const prompt = 'Hello, world!';
            const responseMock = {
                data: {
                    choices: [{ message: { content: 'Hello back!' } }]
                }
            };

            axios.post.mockResolvedValue(responseMock);

            const response = await openaiConnection.ask(prompt);
            console.log(response);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer open-ai-key`
                    }
                }
            );
            console.log("final response:"+response);
            expect(response).toBe('Hello back!');
        });

        //test case 2
        it('should throw an error if the API call fails', async () => {
            const prompt = 'Hello, world!';
            const errorMessage = 'Error communicating with OpenAI API';
            const errorResponse = {
                response: {
                    status: 500
                },
                message: errorMessage
            };

            axios.post.mockRejectedValue(errorResponse);

            await expect(openaiConnection.ask(prompt)).rejects.toThrowError(errorMessage);
        });

        //test case 3
        it('should handle 401 Unauthorized errors', async () => {
            const prompt = 'Hello, world!';
            const errorMessage = 'Error communicating with OpenAI API: Unauthorized. Check your API key.';
            const errorResponse = {
                response: {
                    status: 401
                }
            };

            axios.post.mockRejectedValue(errorResponse);

            await expect(openaiConnection.ask(prompt)).rejects.toThrowError(errorMessage);
        });

        //test case 4
        it('should handle 429 Rate Limit Exceeded errors', async () => {
            const prompt = 'Hello, world!';
            const errorMessage = 'Error communicating with OpenAI API: Rate Limit Exceeded. Reduce the rate of requests.';
            const errorResponse = {
                response: {
                    status: 429
                }
            };

            axios.post.mockRejectedValue(errorResponse);

            await expect(openaiConnection.ask(prompt)).rejects.toThrowError(errorMessage);
        });
    });
});
