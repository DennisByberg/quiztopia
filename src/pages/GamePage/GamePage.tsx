import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import QuizTopiaGame from "../../components/QuiztopiaGame/QuizTopiaGame";
import "./GamePage.scss";

function GamePage() {
  return (
    <section className="game-page">
      <Header />
      <QuizTopiaGame />
      <Footer />
    </section>
  );
}
export default GamePage;
