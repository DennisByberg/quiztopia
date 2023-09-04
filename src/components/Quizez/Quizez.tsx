import { ReactNode, useEffect, useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import "./Quizez.scss";

function Quizez() {
  const [allQuizezComponent, setAllQuizezComponent] = useState<ReactNode[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data: IGetQuizezDataResponse = await response.json();
        // console.log(data);

        if (data.quizzes) {
          const quizComponents: ReactNode[] = data.quizzes.map((quiz) => (
            <QuizCard
              key={quiz.quizId}
              userName={quiz.username}
              quizId={quiz.quizId}
            />
          ));
          setAllQuizezComponent(quizComponents);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="quizzez">
      <ul>{allQuizezComponent}</ul>
    </section>
  );
}

export default Quizez;
