import "./CreateNewQuizSlider.scss";
import xPNG from "../../images/close.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function CreateNewQuizSlider({ setisCreateNewQuizSliderOpen }: any) {
  const [quizName, setQuizName] = useState<string>("");
  const userToken = useSelector((state: RootState) => state.user.loggedInToken);

  function handleCreateQuiz(event: any) {
    event.preventDefault();

    if (quizName.length < 5) return;
    console.log(quizName);
    console.log(userToken);
    createQuiz(userToken, quizName);
  }

  async function createQuiz(token: string, newQuizName: string) {
    const url = `${import.meta.env.VITE_SWAGGER_URL}/quiz`;

    const settings = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: newQuizName }),
    };
    const response = await fetch(url, settings);
    console.log(response);
    const data: any = await response.json();
    console.log(data);
  }
  return (
    <section className="create-new-quiz-slider">
      <img
        onClick={() => setisCreateNewQuizSliderOpen((prev: any) => !prev)}
        className="create-new-quiz-slider__close-btn"
        src={xPNG}
      />
      <form>
        <fieldset>
          <legend>Create New Quiz</legend>
          <input
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="Enter quizname here..."
            type="text"
          />
          <button onClick={handleCreateQuiz}>Create Quiz</button>
        </fieldset>
      </form>
    </section>
  );
}
export default CreateNewQuizSlider;
