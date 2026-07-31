import React, { useState, useRef, useEffect } from 'react';
import ChatBar from './ChatBar';
import InitialContent from './InitialContent';
import ChatMessages from './ChatMessages';

function ChatBot({ userName }) {
  const [messages, setMessages] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [chatType, setChatType] = useState("bookChat");
  const [question, setQuestion] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chatBarActivate,setChatBarActivate]=useState(true);
  const chatRef = useRef(null);


 const updateChatType=async(value)=>{
    setChatType(value);
    console.log("settingg:"+value);
    console.log("settingg:"+chatType);
  }

  const getMessageText = () => {
    // Return the appropriate message text based on chatType
    switch (chatType) {
      case 'newReadersChat':
        return "Hi!, I'm a new reader. Help me find a book.";
      case 'avidReadersChat':
        return "Hi!, I'm an avid reader. Help me find a book.";
      case 'bookChat':
        return "Hi!, let's have a chat about books.";
      default:
        return '';
    }
  };

  //******************************************************************************* */

  const updateChat = async (messageText) => {
    setBotTyping(true);
    if (messageText.trim() === "") return;

    const newMessage = {
      text: messageText,
      from: 'user'
    };

    // Update messages with the current state
    setMessages(prevMessages => [...prevMessages, newMessage]);

    console.log(messages); // FOR DEBUGGING

    // Send a POST request for the first message
    if (messages.length === 0 && chatType !== null) {
      try {
        const res = await fetch(`http://localhost:3001/chat/${chatType}/startConversation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        const response = data.question; // Assuming your backend responds with the bot's response
        setQuestion(response); // Update the bot's message with the response from the backend
        setQuestionIndex(0);
        setBotResponseAndUpdateMessages(response); 
        
      } catch (error) {
        console.error('Error sending request:', error);
        setBotTyping(false); // Set botTyping to false on error
      }
    } else {
      // Send a POST request for each subsequent message
      try {
        const res = await fetch(`http://localhost:3001/chat/${chatType}/generateResponse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userResponse: messageText, // Use the current messageText as userResponse
            questionAsked: question,
            questionIndex: questionIndex   
          })
        });
        const data = await res.json();
        const response = data.response;
        const appendingQuestion=data.question;
        const queIndex=data.questionIndex;
        setQuestion(data.question);
        setQuestion(data.question); //either question to ask or previous que
        setBotResponse(response); // Update the bot's message with the response from the backend
        setQuestionIndex(data.questionIndex);
        const demoResponse = response + appendingQuestion;
        console.log("Demo response:", demoResponse);
        setBotResponseAndUpdateMessages(demoResponse);

        if(chatType==="avidReadersChat"){
          if (queIndex === 8) {
            console.log("rec reached");
            // Fetch recommendation if all questions have been answered
            fetchRecommendation();
            setChatBarActivate(false);
          }
        }

        if(chatType==="newReadersChat"){
          if (queIndex===6){
            fetchNewReaderRecommendation();
            setChatBarActivate(false);

          }
        }

        if (chatType==="bookChat"){
          if (queIndex===6){
            setChatBarActivate(false);

          }
        }
        
      } catch (error) {
        console.error('Error sending request:', error);
        setBotTyping(false); // Set botTyping to false on error
      }
    }
  };

  // useEffect(() => {
  //   // Call updateChat after chatType is updated
  //   const messageText = getMessageText(); // Get the appropriate message text based on chatType
  //   updateChat(messageText);
  // }, [chatType]); // Watch for changes in chatType or updateChat

  const setBotResponseAndUpdateMessages = (response) => {
    const botMessage = {
      text: response,
      from: 'bot',
    };
    
    
    // const setBotResponseAndUpdateMessages = (response, appendingQuestion) => {
    //   const botMessageResponse = {
    //     text: response,
    //     from: 'bot',
    //   };
    
    //   const botMessageQuestion = {
    //     text: appendingQuestion,
    //     from: 'bot',
    //   };

    // Update messages with the current state
  
    setMessages(prevMessages => [...prevMessages, botMessage]);
    console.log(messages);

    setBotTyping(false);
    // Hide initial content after the first interaction
    setShowInitialContent(false);
  };

  const fetchRecommendation = async () => {
    try {
      const recommendationRes = await fetch('http://localhost:3001/chat/avidReadersChat/generateRecommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages // Pass all stored messages
        })
      });
      const recommendationData = await recommendationRes.json();
      console.log(recommendationData);
      // Handle the recommendation data
      console.log("Recommendation:", recommendationData.recommendation);
      setBotResponseAndUpdateMessages(recommendationData.recommendation);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  const fetchNewReaderRecommendation=async ()=>{
    try {
      const userMessages = messages.filter(message => message.from === 'user');

      const recommendationRes = await fetch('http://localhost:3001/rec/newUserRec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversation: userMessages.map(message => message.text).join(' ') // Pass all stored messages
        })
      });
      const recommendationData = await recommendationRes.json();
      console.log(recommendationData);
      // Handle the recommendation data
      console.log("Recommendation:", recommendationData.bestMatchBook.title);
      console.log("Recommendation:", recommendationData.bestMatchBook.description);
      setBotResponseAndUpdateMessages(recommendationData.bestMatchBook.title+" :"+ recommendationData.bestMatchBook.description);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat messages when messages change
    chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
  }, [messages]);

  return (

    <div className='h-full flex flex-col border border-gray-300 rounded-lg  ' style={{ backgroundColor: '#f2f2f2' }}>
      

    
      {showInitialContent && <InitialContent userName={userName} updateChatType={updateChatType} updateChat={updateChat} />}

      <ChatMessages messages={messages} botTyping={botTyping} />

      {chatBarActivate && <ChatBar updateChat={updateChat} /> }
      
    </div>
  );
}

export default ChatBot;
