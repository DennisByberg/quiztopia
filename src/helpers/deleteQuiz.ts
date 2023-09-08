/**
 * Deletes a quiz from the server.
 * @param quizId - The quiz ID of the quiz to be deleted.
 * @param token - The authentication token for authorization.
 * @returns - `true` if the quiz was successfully deleted, `false` otherwise.
 */
export async function deleteQuiz(quizId: string, token: string) {
  const url = `${import.meta.env.VITE_SWAGGER_URL}/quiz/${quizId}`;

  const settings = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
}
