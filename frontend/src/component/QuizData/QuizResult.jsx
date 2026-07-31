import React from 'react';

const QuizResult = ({ score, totalQuestions, resetQuiz, formattedTime }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="results custom-box mx-auto max-w-md p-4 border border-black rounded-lg" style={{ backgroundImage: 'linear-gradient(to top, #c71d6f 0%, #d09693 100%)' }}>
      <h2 className="text-center text-3xl mb-4 text-brown">Quiz Result</h2>
      <table className="w-full  bg-brown  mb-4 border-collapse border border-gray-400 text-white  ">
        <tbody>
          <tr>
            <td className="py-2 px-2  border border-gray-400 ">Total Questions</td>
            <td className="py-2 px-2  border border-gray-400">{totalQuestions}</td>
          </tr>
          <tr>
            <td className="py-2 px-2  border border-gray-400">Questions Attempted</td>
            <td className="py-2 px-2 border border-gray-400">{totalQuestions}</td>
          </tr>
          <tr>
            <td className="py-2 px-2  border border-gray-400">Correct Answers</td>
            <td className="py-2 px-2 border border-gray-400">{score}</td>
          </tr>
          <tr>
            <td className="py-2 px-2  border border-gray-400">Incorrect Answers</td>
            <td className="py-2 px-2 border border-gray-400">{totalQuestions - score}</td>
          </tr>
          <tr>
            <td className="py-2 px-2  border border-gray-400">Percentage</td>
            <td className="py-2 px-2   border border-gray-400">{percentage}%</td>
          </tr>
          <tr>
            <td className="py-2 px-2  border border-gray-400">Your Total Score</td>
            <td className="py-2 px-2  border border-gray-400">{score}/{totalQuestions}</td>
          </tr>
          <tr>
            <td className="py-2 px-2  border border-gray-400">Total Time Taken</td>
            <td className="py-2 px-2  border border-gray-400">{formattedTime}</td>
          </tr>
        </tbody>
      </table>
      <p className={`text-xl mb-4 ${percentage >= 75 ? 'text-green-700' : 'text-red-800'} font-bold`}>
        {percentage >= 75 ? 'Congratulations! You did a great job on this quiz!' : 'Better luck next time!'}
      </p>
      <div className="results custom-box mx-auto max-w-md p-4  flex justify-center items-center">
  <button type="button" className="btn bg-very-light-maroon text-brown font-bold py-2 px-4 rounded" onClick={resetQuiz}>
    Try Again
  </button>
</div>

    </div>
  );
};

export default QuizResult;
