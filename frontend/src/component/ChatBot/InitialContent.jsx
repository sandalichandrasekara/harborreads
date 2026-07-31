import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/PresentToAll';
import './ChatBot.css';
import './initialContent.css'

function InitialContent({userName,updateChatType,updateChat}) {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [currentChatType,setCurrentChatType]=useState('');
  const handleButtonClick = (value,messageText) => {
    updateChatType(value);
    setCurrentChatType(value);
  };

  const handleInitialMessage=()=>{
    const messageText = getMessageText(); // Get the appropriate message text based on chatType
    updateChat(messageText);
  }

  useEffect(()=>{
    handleInitialMessage();
  },[currentChatType]);

  const getMessageText = () => {
    // Return the appropriate message text based on chatType
    switch (currentChatType) {
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


  useEffect(() => {
    // Trigger button animations sequentially after a slight delay
    const animationTimeouts = [
      setTimeout(() => setButtonsVisible(true), 200),
      setTimeout(() => document.getElementById('button2').classList.add('zoom-in-sequence'), 400),
      setTimeout(() => document.getElementById('button3').classList.add('zoom-in-sequence'), 600)
    ];

    // Clear timeouts on component unmount
    return () => {
      animationTimeouts.forEach(clearTimeout);
    };
  }, []);


  return (
    <div className="flex flex-col justify-center items-center h-full  animate-fadeI">
      <div className="p-3 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-black">
        Hello,{' '+userName} !
        <span role="img" aria-label="Waving emoji" style={{ display: 'inline-block', animation: 'wave 0.5s linear  forwards' }}>👋</span>
      </h1>
        <p className="text-2xl md:text-4xl font-bold text-brown-700">How can I help you today? <span role="img" aria-label="Thinking emoji">🤔</span></p>
      </div>
      <div className="chatgrid text-black">
        <button
          className={`button md:h-[9.375rem] h-[6rem] ${buttonsVisible ? 'zoom-in-sequence' : ''}`}
          style={{ backgroundImage: 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)', fontSize: '1.25rem' }}
          onClick={() => {
            handleButtonClick('newReadersChat');
          }}
        >
          New to reading?
          <br /> Need help finding a book?
          <SendIcon className="arrow" />
          <span className="click-to-send">Click to send</span>
        </button>
        <button
          id="button2"
          className="button md:h-[9.375rem] h-[5.625rem]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
            fontSize: '1.25rem',
            color: '#ffffff',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            handleButtonClick('avidReadersChat');
          }}
        >
          Love reading?
          <br /> Let's find your next book!
          <SendIcon className="arrow" style={{ marginLeft: '0.5rem' }} />
          <span className="click-to-send" style={{ marginTop: '0.5rem' }}>
            Click to send
          </span>
        </button>

        <button
          id="button3"
          className="button md:h-[9.375rem] h-[5.625rem]"
          style={{ backgroundImage: 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)', fontSize: '1.25rem' }}
          onClick={() => {
            handleButtonClick('bookChat');
          }}
        >

          Interested in chatting about books?
          <SendIcon className="arrow" />
          <span className="click-to-send">Click to send</span>
        </button>
      </div>
    </div>
  );
}

export default InitialContent;