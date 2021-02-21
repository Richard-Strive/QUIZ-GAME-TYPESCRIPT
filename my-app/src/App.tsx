import React, { useState } from "react";
import QuestionCards from "./Components/QuestionCards";
import {fetchQuizQuestions, Difficulty, QuestionState} from "./API"

export type AnswerObject={
  question:string,
  answer:string,
  correct:boolean,
correctAnswer:string
}


const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log("THIS ARE THE QUESTIONS---->", questions)

  const StartTrivia = async() => {

    try {
      setLoading(true)
      setGameOver(false)
  
      const newQuestions= await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
      console.log("The game started");
  
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)

    //  setTimeout(() => {
      //    setLoading(false)
      //  }, 1000);
      // finalmente cosi posso visualizzare il loader. NB in questo blocco di codice faccio il recap del loader
      

      setLoading(false)

    } catch (error) {
      console.log(error)
    }

  };

  const CheckAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {

    if(!gameOver){
      const answer= e.currentTarget.value;

      const correct= questions[number].correct_answer===answer
      console.log(correct)
//Questa linea di codice mi da un valore booleano
      if(correct)setScore(prev=>prev+1)
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      }

      setUserAnswers((prev)=>[...prev, answerObject])

    }


    console.log("Let's see if your question it's write or wrong");
  };

  const NextQuestion = () => {
    console.log("You are flipping to the next question");
    const NextQuestion= number+1
    if(NextQuestion=== TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(NextQuestion)
    }
  };

  return (
    <div className="App">
      <h1>WELCOME TO MY QUIZ GAME</h1>
     {gameOver||userAnswers.length===TOTAL_QUESTIONS? (<button className="start" onClick={StartTrivia}>
        Start the game
      </button>):null}
      {!gameOver?<p>Score:{score}</p>:null}
      {loading&&<p>Loading... keep patience please</p>}
      {!loading&&!gameOver&&<QuestionCards
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers? userAnswers[number]: undefined}
        callback={CheckAnswers}
      />}

      {!loading&&!gameOver&&userAnswers.length===number+1&&number !== TOTAL_QUESTIONS-1?
      (<button className="next" onClick={NextQuestion}>
        Next
      </button>)
    :null
    }
    </div>
  );
}

export default App;
