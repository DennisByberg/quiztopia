import { useEffect, useState } from "react";
import "./Quizzes.scss";
import { scrollToTop } from "../../helpers/scrollToTop";
import { v4 as getUniqueKey } from "uuid";

function Quizzes({ setUserQuizzes }: IQuizzesProps) {
  const [quizzesComponent, setQuizzesComponent] = useState<IQuizzez[]>([]);

  useEffect(() => {
    async function getAllQuizzesFromAPI() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );

        const data: IGetQuizezDataResponse = await response.json();

        if (data.quizzes) {
          const quizComponents = data.quizzes.filter((quiz) => {
            return (
              quiz.quizId !== undefined &&
              quiz.quizId.length < 18 &&
              quiz.username !== undefined &&
              quiz.username.length < 18 &&
              quiz.questions.every((question: IQuestions) => {
                return (
                  typeof question?.location?.latitude === "number" &&
                  typeof question?.location?.longitude === "number"
                );
              })
            );
          });
          setQuizzesComponent(quizComponents);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    getAllQuizzesFromAPI();
  }, [setUserQuizzes]);

  async function fetchAndProcessQuizData(clickedQuizCardId: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_SWAGGER_URL}/quiz`);
      const data: IGetQuizezDataResponse = await response.json();

      if (data.quizzes) {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );
        const data: IGetQuizezDataResponse = await response.json();

        if (data.quizzes) {
          const foundQuiz = data.quizzes.find(
            (quiz) => quiz.quizId === clickedQuizCardId
          );

          if (foundQuiz) {
            // lyckas inte få denna att funka... enda any i projektet...
            const questions: any = foundQuiz.questions || [];
            console.log(questions);

            setUserQuizzes(questions);
          }
        }
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
    scrollToTop();
  }

  return (
    <section className="quizzez">
      <h2>Available Quizzes</h2>
      <ul>
        {quizzesComponent.map((quiz: any) => (
          <li className="quiz-card" key={getUniqueKey()}>
            <p className="quiz-card__quiz-name">{quiz.quizId}</p>
            <p className="quiz-card__username">Made by {quiz.username}</p>
            <button onClick={() => fetchAndProcessQuizData(quiz.quizId)}>
              Show Questions
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Quizzes;
