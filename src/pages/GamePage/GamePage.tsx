import { useState } from "react";
import Header from "../../components/Header/Header";
import QuiztopiaMap from "../../components/QuiztopiaMap/QuiztopiaMap";
import Quizzes from "../../components/Quizzes/Quizzes";
import "./GamePage.scss";
import CreateNewQuizSlider from "../../components/CreateNewQuizSlider/CreateNewQuizSlider";
import AddNewQuestionToQuizForm from "../../components/AddNewQuestionToQuizForm/AddNewQuestionToQuizForm";

function GamePage() {
  const [userQuizzes, setUserQuizzes] = useState<IUserQuizzes[] | []>([]);
  const [isAllQuizzesOpen, setIsAllQuizzesOpen] = useState<boolean>(false);
  const [isCreateNewQuizSliderOpen, setisCreateNewQuizSliderOpen] =
    useState<boolean>(false);
  const [isAddNewQuestion, setIsAddNewQuestion] = useState<boolean>(false);

  const [newQuestionLat, setNewQuestionLat] = useState<number>(0);
  const [newQuestionLon, setNewQuestionLon] = useState<number>(0);

  function handleCreateNewQuiz() {
    // Close all quizzes if they are currently open
    isAllQuizzesOpen && setIsAllQuizzesOpen(false);

    setisCreateNewQuizSliderOpen((prev) => !prev);
  }

  return (
    <section className="game-page">
      <Header />
      <QuiztopiaMap
        setNewQuestionLat={setNewQuestionLat}
        setNewQuestionLon={setNewQuestionLon}
        userQuizzes={userQuizzes}
        isAddNewQuestionSliderOpen={isAddNewQuestion}
      />
      {!isAddNewQuestion ? (
        <div className="game-page__buttons">
          <button onClick={() => setIsAllQuizzesOpen((prev) => !prev)}>
            {isAllQuizzesOpen
              ? "Hide Available Quizzes"
              : "Show Available Quizzes"}
          </button>
          <button onClick={handleCreateNewQuiz}>Create New Quiz</button>
          <button onClick={() => setIsAddNewQuestion((prev) => !prev)}>
            Add New Question
          </button>
        </div>
      ) : (
        <AddNewQuestionToQuizForm
          setIsAddNewQuestion={setIsAddNewQuestion}
          newQuestionLat={newQuestionLat}
          newQuestionLon={newQuestionLon}
        />
      )}
      {isAllQuizzesOpen ? <Quizzes setUserQuizzes={setUserQuizzes} /> : ""}
      {isCreateNewQuizSliderOpen ? (
        <CreateNewQuizSlider
          setisCreateNewQuizSliderOpen={setisCreateNewQuizSliderOpen}
        />
      ) : (
        ""
      )}
    </section>
  );
}
export default GamePage;
