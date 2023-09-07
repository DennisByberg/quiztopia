import "./CreateNewQuizSlider.scss";
import xPNG from "../../images/close.png";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createQuiz } from "../../helpers/createQuiz";

function CreateNewQuizSlider({
  setisCreateNewQuizSliderOpen,
}: ICreateNewQuizSliderProps) {
  const [quizName, setQuizName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const userToken = useSelector((state: RootState) => state.user.loggedInToken);

  function handleCreateQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    createQuiz(
      userToken,
      quizName,
      setSuccessMessage,
      setErrorMessage,
      setisCreateNewQuizSliderOpen
    );
  }

  function handleQuizNameChange(e: ChangeEvent<HTMLInputElement>) {
    setQuizName(e.target.value);
    // Clear messages if it exists (if truthy)
    errorMessage && setErrorMessage("");
    successMessage && setSuccessMessage("");
  }

  return (
    <section className="create-new-quiz-slider">
      <img
        onClick={() => setisCreateNewQuizSliderOpen((prev) => !prev)}
        className="create-new-quiz-slider__close-btn"
        src={xPNG}
      />
      <form>
        <fieldset>
          <legend>Create New Quiz</legend>
          <input
            onChange={handleQuizNameChange}
            placeholder="Enter new quiz name"
            type="text"
          />
          <p className="login__error-msg"> {errorMessage} </p>
          <p className="login__success-msg"> {successMessage} </p>
          <button onClick={handleCreateQuiz}>Create Quiz</button>
        </fieldset>
      </form>
    </section>
  );
}
export default CreateNewQuizSlider;
