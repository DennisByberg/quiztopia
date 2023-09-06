import { ReactNode, useEffect, useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import "./Quizzes.scss";
import { scrollToTop } from "../../helpers/scrollToTop";

function Quizzes({ setUserQuizzes }: IQuizzesProps) {
  const [quizzesComponent, setQuizzesComponent] = useState<ReactNode[]>([]);

  useEffect(() => {
    /**
     * Function to fetch quizzes from an API and render out quiz cards.
     */
    async function getAllQuizzesFromAPI() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );

        const data: IGetQuizezDataResponse = await response.json();
        console.log(data.quizzes);

        if (data.quizzes) {
          const quizComponents = data.quizzes
            .filter(
              (quiz) => quiz.quizId !== undefined && quiz.username !== undefined
            )
            .map((quiz) => (
              <QuizCard
                fetchAndProcessQuizData={fetchAndProcessQuizData}
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

    /**
     * function to fetch and process quiz data for a selected quiz.
     * @param clickedQuizCardId - The quizId of the card we press in QuizCard
     */
    async function fetchAndProcessQuizData(clickedQuizCardId: string) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );

        const data: IGetQuizezDataResponse = await response.json();

        if (data.quizzes) {
          // Find the quiz object with the matching 'quizId'.
          const foundQuiz = data.quizzes.find(
            (quiz) => quiz.quizId === clickedQuizCardId
          );
          // Extract the 'questions' property from the found quiz or use an empty array if not found.
          const questions = foundQuiz?.questions || [];

          // Iterate through the questions array and add each question to a user's quiz list.
          questions.forEach((question) => {
            setUserQuizzes((prev: IUserQuizzes[]) => prev.concat(question));
          });
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
      scrollToTop();
    }

    getAllQuizzesFromAPI();
  }, []);

  return (
    <section className="quizzez">
      <h2>Available Quizzez</h2>
      <ul>{quizzesComponent}</ul>
    </section>
  );
}

export default Quizzes;
