import React from 'react';

const QuizHome = ({ startQuiz }) => {
  const containerStyle = {
    backgroundImage: 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)',
  };

  return (
    <div className="home-box custom-box mx-auto border-2 border-gray-300 rounded-2xl w-full" style={containerStyle}>
      <div className="text-left text-lg md:text-l rounded-2xl overflow-hidden">
        {/* Container for the image with rounded corners */}
        <div className="rounded-t-2xl overflow-hidden">
          <img
            src="https://storage.letudiant.fr/mediatheque/letudiant/2/4/2393824-adobestock-230379361-766x438.jpeg"
            alt="Quiz"
            className="w-full"
          />
        </div>
        <h3 className="text-l font-semibold mt-6 md:mt-8 mb-2 ml-2">Instructions:</h3>
        <p className="mb-2 ml-2">01. Total number of questions: <span className="totalQuestion font-semibold">10</span></p>
        <p className="mb-2 ml-2">02. Once you select your answer, it can't be undone.</p>
        <p className="mb-2 ml-2">03. You cannot exit from the quiz while you are playing.</p>
        <p className="mb-2 ml-2">04. You have to complete the quiz within 10 minutes.</p>
      </div>
      <div className="flex justify-center mt-5 md:mt-7 mb-3 ml-3 ">
      <button type="button" className="btn bg-brown hover:bg-brown-700 text-white font-bold py-2 px-6 rounded inline-block" onClick={startQuiz}>Start Quiz</button>

      </div>
    </div>
  );
};

export default QuizHome;
