import { MouseEvent, useState } from "react";
import "./AddNewQuestionToQuizForm.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import xPNG from "../../images/close.png";

function AddNewQuestionToQuizForm({
  newQuestionLon,
  newQuestionLat,
  setIsAddNewQuestion,
}: IAddNewQuestionToQuizFormProps) {
  const [quizNameInput, setQuizNameInput] = useState<string>("");
  const [questionInput, setQuestionInput] = useState<string>("");
  const [answerInput, setAnswerInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const userToken = useSelector((state: RootState) => state.user.loggedInToken);

  async function handleAddQuestion(e: MouseEvent<HTMLButtonElement>) {
    const url = `${import.meta.env.VITE_SWAGGER_URL}/quiz/question`;
    const lon = newQuestionLon.toString();
    const lat = newQuestionLat.toString();
    e.preventDefault();

    const questionBody = {
      name: quizNameInput,
      question: questionInput,
      answer: answerInput,
      location: {
        longitude: lon,
        latitude: lat,
      },
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(questionBody),
    };

    const response = await fetch(url, settings);
    const data = await response.json();

    if (data.success) {
      setSuccessMessage("Successfully added quiz");
      setTimeout(() => {
        setSuccessMessage("");
        setIsAddNewQuestion(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setErrorMessage("Failed to add quiz");
      }, 2000);
    }
  }

  return (
    <form className="add-new-question-to-quiz-form">
      <fieldset>
        <img onClick={() => setIsAddNewQuestion((prev) => !prev)} src={xPNG} />
        <legend>Add New Question & Answer</legend>
        <input
          onChange={(e) => setQuizNameInput(e.target.value)}
          type="text"
          placeholder="Enter existing quiz name"
        />
        <input
          onChange={(e) => setQuestionInput(e.target.value)}
          type="text"
          placeholder="Enter new question"
        />
        <input
          onChange={(e) => setAnswerInput(e.target.value)}
          type="text"
          placeholder="Enter new answer"
        />
        <div className="add-new-question-to-quiz-form__lat-and-lon-container">
          <div className="add-new-question-to-quiz-form__lat-and-lon">
            <label>LAT</label>
            <p>{newQuestionLat}</p>
          </div>
          <div className="add-new-question-to-quiz-form__lat-and-lon">
            <label>LON</label>
            <p>{newQuestionLon}</p>
          </div>
          <p className="add-new-question-to-quiz-form__info-msg">
            Press somewhere on the map to put a pin and get your location
            numbers
          </p>
        </div>
        <p className="add-new-question-to-quiz-form__error-msg">
          {errorMessage}
        </p>
        <p className="add-new-question-to-quiz-form__success-msg">
          {successMessage}
        </p>
        <button onClick={handleAddQuestion}>Add Question</button>
      </fieldset>
    </form>
  );
}
export default AddNewQuestionToQuizForm;
