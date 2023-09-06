import "./QuizCard.scss";

function QuizCard({ userName, quizId, logPressedObject }: QuizCardProps) {
  return (
    <li className="quiz-card">
      <p>{userName}</p>
      <p>{quizId}</p>
      <button onClick={() => logPressedObject(quizId)}>Show Questions</button>
    </li>
  );
}
export default QuizCard;
