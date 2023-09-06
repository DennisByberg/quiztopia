import "./QuizCard.scss";

function QuizCard({
  userName,
  quizId,
  fetchAndProcessQuizData,
}: IQuizCardProps) {
  return (
    <li className="quiz-card">
      <p>{userName}</p>
      <p>{quizId}</p>
      <button onClick={() => fetchAndProcessQuizData(quizId)}>
        Show Questions
      </button>
    </li>
  );
}
export default QuizCard;
