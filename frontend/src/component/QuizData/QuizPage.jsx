import React, { useState, useEffect } from 'react';
import QuizHome from './QuizHome';
import QuizResult from './QuizResult';
import QuestionCard from './QuestionCard';
import Questions from './QuestionsData';
import axios from 'axios'; // Import axios


const Quiz = ({username}) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(600);
  const [formattedTime, setFormattedTime] = useState('10:00');
  const [userAnswers, setUserAnswers] = useState(Array(Questions.length).fill(undefined));

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && !showResult) {
        setTimer(timer - 1);
        const minutes = Math.floor((timer - 1) / 60);
        const seconds = (timer - 1) % 60;
        setFormattedTime(
          `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        );
      } else {
        clearInterval(interval);
        setShowResult(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionChange = (option) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = option;
    setUserAnswers(updatedUserAnswers);
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswerIndex = Questions[currentQuestion].answer;
    const correctAnswer = Questions[currentQuestion].options[correctAnswerIndex];

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion === Questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    }
  };

  const resetQuiz = async () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
    setTimer(600);
    setFormattedTime('10:00');
    setUserAnswers(Array(Questions.length).fill(undefined));
  };

  const submitScore =  () => {
    try {
       axios.post('http://localhost:3001/leaderboard/setLeaderboardScore', {
        username: username,
        score: ((score / 10) * 100).toFixed(2)
      });
    } catch (error) {
      console.error('Failed to set leaderboard score:', error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-lg w-full">
        {!quizStarted && <QuizHome startQuiz={startQuiz} />}
        {quizStarted && !showResult && (
          <QuestionCard
            question={Questions[currentQuestion]}
            selectedOption={selectedOption}
            userAnswers={userAnswers}
            handleOptionChange={handleOptionChange}
            handleNextQuestion={handleNextQuestion}
            currentQuestion={currentQuestion}
            totalQuestions={Questions.length}
            formattedTime={formattedTime}
          />
        )}
        {showResult && (
      <>
        <QuizResult
          score={score}
          totalQuestions={Questions.length}
          resetQuiz={resetQuiz}
          formattedTime={formattedTime}
        />
        {submitScore()} {/* Call setResultsShown function here */}
      </>
    )}
      </div>
    </div>
  );
};

export default Quiz;
