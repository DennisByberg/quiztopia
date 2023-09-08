import { useEffect } from "react";
import "./MyQuizzes.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { v4 as getUniqueKey } from "uuid";
import { deleteQuiz } from "../../helpers/deleteQuiz";

function MyQuizzes({
  myQuizzesComponent,
  setMyQuizzesComponent,
}: IMyQuizzesProps) {
  const loggedInUserName = useSelector(
    (state: RootState) => state.user.loggedInUser
  );
  const token = useSelector((state: RootState) => state.user.loggedInToken);

  useEffect(() => {
    /**
     * Function to fetch quizzes from an API and render out quiz cards.
     */
    async function getMyQuizzesFromAPI() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SWAGGER_URL}/quiz`
        );
        const data: IGetQuizezDataResponse = await response.json();

        if (data.quizzes) {
          const myQuizData = data.quizzes
            .filter((quiz) => quiz.username === loggedInUserName)
            .map((quiz) => ({
              userName: quiz.username,
              quizId: quiz.quizId,
            }));

          setMyQuizzesComponent(myQuizData);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    getMyQuizzesFromAPI();
  }, [setMyQuizzesComponent, loggedInUserName]);

  async function handleDeleteQuiz(quizId: string) {
    const success: boolean = await deleteQuiz(quizId, token);
    if (success) {
      // Remove the deleted quiz from the list of quizzes
      const updatedQuizzes = myQuizzesComponent.filter(
        (quiz: IMyQuizzes) => quiz.quizId !== quizId
      );
      setMyQuizzesComponent(updatedQuizzes);
    }
  }

  return (
    <section className="my-quizzes">
      <h2>My Quizzes</h2>
      {myQuizzesComponent.length ? (
        <ul>
          {myQuizzesComponent.map((quiz) => (
            <li key={getUniqueKey()}>
              <p>{quiz.quizId}</p>
              <button onClick={() => handleDeleteQuiz(quiz.quizId)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any quizzes...</p>
      )}
    </section>
  );
}

export default MyQuizzes;
