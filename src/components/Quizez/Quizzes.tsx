import { ReactNode, useEffect, useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import "./Quizzes.scss";
import { scrollToTop } from "../../helpers/scrollToTop";

function Quizzes({ setUserQuizzes }: IQuizzesProps) {
  const [quizzesComponent, setQuizzesComponent] = useState<ReactNode[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );

        const data: IGetQuizezDataResponse = await response.json();

        if (data.quizzes) {
          const quizComponents = data.quizzes
            .filter(
              (quiz) => quiz.quizId !== undefined && quiz.username !== undefined
            )
            .map((quiz) => (
              <QuizCard
                logPressedObject={logPressedObject}
                key={quiz.quizId}
                userName={quiz.username}
                quizId={quiz.quizId}
              />
            ));
          setQuizzesComponent(quizComponents);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    async function logPressedObject(qId: string) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );

        const data: IGetQuizezDataResponse = await response.json();

        if (data.quizzes) {
          const foundQuiz = data.quizzes.find((quiz) => quiz.quizId === qId);
          const questions = foundQuiz?.questions || [];

          questions.forEach((q) => {
            setUserQuizzes((prev: any) => prev.concat(q));
          });
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
      scrollToTop();
    }

    fetchData();
  }, []);

  return (
    <section className="quizzez">
      <h2>Available Quizzez</h2>
      <ul>{quizzesComponent}</ul>
    </section>
  );
}

export default Quizzes;
