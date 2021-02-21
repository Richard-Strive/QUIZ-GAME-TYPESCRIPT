import { shufflyArray } from "./Utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

/**
 *   Visto che l'api ci ritorna una object che mantiene sia le risposte corrette che quelle incorrette
 * separate. Noi aggiungiamo una nuova proprieta' che le unisce.
 */

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(await data);
  
  return await data.results.map((question: Question) => ({
      ...question,
      answers: shufflyArray([...question.incorrect_answers, question.correct_answer]),
    }));
};
