import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Quizez from "../../components/Quizez/Quizez";
import QuizTopiaGame from "../../components/QuiztopiaGame/QuizTopiaGame";
import "./GamePage.scss";

function GamePage() {
  return (
    <section className="game-page">
      <Header />
      <QuizTopiaGame />
      <Quizez />
      <Footer />
    </section>
  );
}
export default GamePage;
