import "./QuizCard.scss";

function QuizCard({ userName, quizId }: QuizCardProps) {
  return (
    <li className="quiz-card">
      <p>{userName}</p>
      <p>{quizId}</p>
      <button>Show Questions</button>
    </li>
  );
}
export default QuizCard;
