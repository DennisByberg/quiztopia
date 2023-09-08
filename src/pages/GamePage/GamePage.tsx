import { ReactNode, useState } from "react";
import Header from "../../components/Header/Header";
import QuiztopiaMap from "../../components/QuiztopiaMap/QuiztopiaMap";
import Quizzes from "../../components/Quizzes/Quizzes";
import "./GamePage.scss";
import CreateNewQuizSlider from "../../components/CreateNewQuizSlider/CreateNewQuizSlider";
import AddNewQuestionToQuizForm from "../../components/AddNewQuestionToQuizForm/AddNewQuestionToQuizForm";
import MyQuizzes from "../../components/MyQuizzes/MyQuizzes";

function GamePage() {
  const [userQuizzes, setUserQuizzes] = useState<IQuestions[]>([]);
  const [isAllQuizzesOpen, setIsAllQuizzesOpen] = useState<boolean>(false);
  const [isCreateNewQuizSliderOpen, setisCreateNewQuizSliderOpen] =
    useState<boolean>(false);
  const [isAddNewQuestion, setIsAddNewQuestion] = useState<boolean>(false);
  const [isMyQuizzesOpen, setIsMyQuizzesOpen] = useState<boolean>(false);

  const [newQuestionLat, setNewQuestionLat] = useState<number>(0);
  const [newQuestionLon, setNewQuestionLon] = useState<number>(0);
  const [myQuizzesComponent, setMyQuizzesComponent] = useState<IMyQuizzes[]>(
    []
  );

  function handleCreateNewQuiz() {
    isAllQuizzesOpen && setIsAllQuizzesOpen(false);
    isMyQuizzesOpen && setIsMyQuizzesOpen(false);
    setisCreateNewQuizSliderOpen((prev) => !prev);
  }

  function handleShowMyQuizzes() {
    isAllQuizzesOpen && setIsAllQuizzesOpen(false);
    setIsMyQuizzesOpen((prev) => !prev);
  }

  function handleAddNewQuestion() {
    isAllQuizzesOpen && setIsAllQuizzesOpen(false);
    isMyQuizzesOpen && setIsMyQuizzesOpen(false);
    setIsAddNewQuestion((prev) => !prev);
  }

  function handleShowAllQuizzes() {
    isMyQuizzesOpen && setIsMyQuizzesOpen(false);
    setIsAllQuizzesOpen((prev) => !prev);
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
        // BUTTONS
        <div className="game-page__buttons">
          <button onClick={handleShowAllQuizzes}>
            {isAllQuizzesOpen
              ? "Hide Available Quizzes"
              : "Show Available Quizzes"}
          </button>
          <button onClick={handleShowMyQuizzes}>
            {isMyQuizzesOpen ? "Hide My Quizzes" : "Show My Quizzes"}
          </button>
          <button onClick={handleCreateNewQuiz}>Create New Quiz</button>
          <button onClick={handleAddNewQuestion}>Add New Question</button>
        </div>
      ) : (
        <AddNewQuestionToQuizForm
          setIsAddNewQuestion={setIsAddNewQuestion}
          newQuestionLat={newQuestionLat}
          newQuestionLon={newQuestionLon}
        />
      )}
      {isAllQuizzesOpen ? <Quizzes setUserQuizzes={setUserQuizzes} /> : ""}
      {isMyQuizzesOpen ? (
        <MyQuizzes
          myQuizzesComponent={myQuizzesComponent}
          setMyQuizzesComponent={setMyQuizzesComponent}
        />
      ) : (
        ""
      )}
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
