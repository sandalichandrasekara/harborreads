import React from 'react';
import LoadingBars from '../ProgressBar/loadinglights';

function ChatMessages({ messages, botTyping }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col p-3">
      {messages.slice(0).map((message, index) => (
        <div key={index} className={`flex items-end ${message.from === 'bot' ? '' : 'justify-end'}`}>
          <div className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${message.from === 'bot' ? 'order-2 items-start' : 'order-1 items-end'}`}>
            <div className="mt-3">
              <span className={`px-4 py-3 rounded-xl inline-block ${message.from === 'bot' ? 'rounded-bl-none bg-custom-color-2 text-black' : 'rounded-br-none bg-brown text-white'}`}>{message.text}</span>
            </div>
          </div>
          <img src={message.from === 'bot' ? 'https://cdn-icons-png.freepik.com/256/11772/11772908.png?ga=GA1.1.464910329.1710353361&': 'https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png'} alt="" className="w-6 h-6 rounded-full" />
        </div>
      ))}
      {botTyping && (
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
            <div>
              {/*<img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
               alt="..." className="w-16 ml-6" />*/}<LoadingBars/> </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
