import "./QuizCard.scss";

function QuizCard({
  userName,
  quizId,
  fetchAndProcessQuizData,
}: IQuizCardProps) {
  return (
    <li className="quiz-card">
      <p className="quiz-card__quiz-name">{quizId}</p>
      <p className="quiz-card__username">Made by {userName}</p>
      <button onClick={() => fetchAndProcessQuizData(quizId)}>
        Show Questions
      </button>
    </li>
  );
}
export default QuizCard;
