/**
 * Creates a new quiz by making a POST request to the quiz creation endpoint.
 * @param {string} token - The token user get when logged in.
 * @param {string} newQuizName - The quiz name the user provided.
 * @param {function} updateSuccessMessage - Updates the success message
 * @param {function} updateErrorMessage - Updates the error message
 */
export async function createQuiz(
  token: string,
  newQuizName: string,
  updateSuccessMessage: (message: string) => void,
  updateErrorMessage: (message: string) => void,
  sliderBoolean: React.Dispatch<React.SetStateAction<boolean>>
) {
  const url = `${import.meta.env.VITE_SWAGGER_URL}/quiz`;

  const settings = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: newQuizName }),
  };

  const response = await fetch(url, settings);
  const data: ICreateQuizResponse = await response.json();

  if (data.success) {
    updateSuccessMessage("Successfully created quiz");

    setTimeout(() => {
      sliderBoolean((prev) => !prev);
    }, 2000);
  } else {
    updateErrorMessage("Could not create quiz");
    setTimeout(() => {
      updateErrorMessage("");
    }, 2000);
  }
}
