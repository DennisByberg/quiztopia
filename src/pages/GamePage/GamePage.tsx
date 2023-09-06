import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import QuiztopiaMap from "../../components/QuiztopiaMap/QuiztopiaMap";
import Quizzes from "../../components/Quizez/Quizzes";
import "./GamePage.scss";

function GamePage() {
  const [userQuizzes, setUserQuizzes] = useState<IUserQuizzes[] | []>([]);

  return (
    <section className="game-page">
      <Header />
      <QuiztopiaMap userQuizzes={userQuizzes} />
      <Quizzes setUserQuizzes={setUserQuizzes} />
      <Footer />
    </section>
  );
}
export default GamePage;
