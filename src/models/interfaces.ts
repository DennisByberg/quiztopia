interface ISignUpApiResponse {
  success: boolean;
  message?: string;
}

interface ILoginApiResponse {
  success: boolean;
  message?: string;
  token?: string;
}

interface UserState {
  loggedInUser: string;
  loggedInToken: string;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface QuizCardProps {
  userName: string;
  quizId: string;
}

interface IGetQuizezDataResponse {
  success: boolean;
  quizzes?: IQuizzez[];
}

interface IQuizzez {
  questions: IQuestions[];
  quizId: string;
  userId: string;
  username: string;
}

interface IQuestions {
  answer: string;
  location: {
    longitude: string;
    latitude: string;
  };
  question: string;
}

interface MapPosition {
  lat: number;
  lng: number;
}
