import React from 'react';
import Questions from './QuestionsData';

const QuestionCard = ({
  question,
  selectedOption,
  handleOptionChange,
  handleNextQuestion,
  currentQuestion,
  totalQuestions,
  formattedTime,
  userAnswers,
}) => {
  console.log('Selected Option:', selectedOption);
  console.log('Correct Answer:', question.answer);

  return (
    <div
      className="border border-brown rounded-lg"
      style={{
        backgroundImage: 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)'
      }}
    >
      <div className="quiz custom-box mx-auto max-w-md p-4">
        <div id="timer" className="text-center mb-4">
          <h6>Time Left</h6>
          <h6 id="time">{formattedTime}</h6>
        </div>
        <div className="que-number font-bold mb-3">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
        <div className="question-text mb-4" style={{ fontSize: '18px' }}>
          {question.q}
          {question.img && <img src={question.img} alt="Question" className="mt-4 mx-auto" />}
        </div>
        <div className="options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="option mb-2"
              style={{
                backgroundColor: selectedOption === option ? '#a34912' : '#db7458',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => handleOptionChange(option)}
            >
              <input
                type="radio"
                id={option}
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => {}}
                style={{ display: 'none' }}
              />
              <label htmlFor={option} style={{ fontSize: '16px', marginLeft: '10px' }}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="next-question-btn text-center mt-4">
          <button
            type="button"
            className="btn bg-brown hover:bg-brown-200 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextQuestion}
          >
            {currentQuestion < totalQuestions - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
        <div className="answers-indicator mt-4 flex justify-center">
          {Array(totalQuestions).fill(null).map((_, index) => {
            const isCorrectAnswer =
              userAnswers[index] !== undefined &&
              userAnswers[index] === Questions[index].options[Questions[index].answer];

            return (
              <div
                key={index}
                className={`indicator h-9 w-9 rounded-full mx-1 ${
                  userAnswers[index] !== undefined
                    ? isCorrectAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-gray-300'
                }`}
                style={{
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {userAnswers[index] !== undefined && (
                  <>
                    {isCorrectAnswer ? (
                      <>
                        <span role="img" aria-label="tick" style={{ color: 'white' }}>
                          ✔️
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          role="img"
                          aria-label="cross"
                          style={{ color: 'white', fontSize: '1.5rem', lineHeight: 1 }}
                        >
                          ✖️
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
