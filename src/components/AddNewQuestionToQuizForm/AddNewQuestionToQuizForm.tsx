import { useState } from "react";
import "./AddNewQuestionToQuizForm.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function AddNewQuestionToQuizForm({ newQuestionLon, newQuestionLat }: any) {
  const [quizNameInput, setQuizNameInput] = useState<string>("");
  const [questionInput, setQuestionInput] = useState<string>("");
  const [answerInput, setAnswerInput] = useState<string>("");

  const userToken = useSelector((state: RootState) => state.user.loggedInToken);

  async function handleAddQuestion(e: any) {
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
    const data: any = await response.json();
    console.log(data);
  }

  return (
    <form className="add-new-question-to-quiz-form">
      <fieldset>
        <legend>Add New Question & Answer</legend>
        <div className="add-new-question-to-quiz-form__input-container">
          <label htmlFor="quiz-name">Quiz Name</label>
          <input
            onChange={(e) => setQuizNameInput(e.target.value)}
            id="quiz-name"
            type="text"
          />
        </div>
        <div className="add-new-question-to-quiz-form__input-container">
          <label htmlFor="question">Question</label>
          <input
            onChange={(e) => setQuestionInput(e.target.value)}
            id="question"
            type="text"
          />
        </div>
        <div className="add-new-question-to-quiz-form__input-container">
          <label htmlFor="answer">Answer</label>
          <input
            onChange={(e) => setAnswerInput(e.target.value)}
            id="answer"
            type="text"
          />
        </div>
        <div>
          <p>Lat: {newQuestionLat}</p>
          <p>Lon: {newQuestionLon}</p>
        </div>
        <button onClick={handleAddQuestion}>Add Question</button>
      </fieldset>
    </form>
  );
}
export default AddNewQuestionToQuizForm;
