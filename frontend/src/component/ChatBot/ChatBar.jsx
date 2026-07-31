import React from 'react';
import SendIcon from '@mui/icons-material/Send';

function TypingBar({ updateChat }) {
  return (
    <div className="px-4 pt-4 mb-2 sm:mb-3" style={{ marginBottom: '1rem' }}>
      <div className="relative flex mb-3">
        <input
          type="text"
          placeholder="Click on a prompt to get started:)"
          autoComplete="off"
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateChat(e.target.value);
              e.target.value = '';
            }
          }}
          className="flex-grow text-md bg-grey-800 border-2 border-grey  focus:border-grey rounded-lg pl-4 sm:pl-3 lg:pl-5 pr-4 sm:pr-3 lg:pr-5 pt-3 pb-3 focus:outline-none"        />
        <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
          <SendIcon
            className="h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 transition duration-200 ease-in-out text-brown hover:text-slate-400"
            onClick={(e) => {
              const inputElement = e.target.parentElement.parentElement.previousElementSibling;
              updateChat(inputElement.value);
              inputElement.value = '';
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TypingBar;
