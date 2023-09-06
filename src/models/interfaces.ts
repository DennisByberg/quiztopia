//------------------------------//
// INTERFACES
//------------------------------//
interface IUserState {
  loggedInUser: string;
  loggedInToken: string;
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

interface IMapPosition {
  lat: number;
  lng: number;
}

interface IUserQuizzes {
  question: string;
  answer: string;
  location: IPosition;
}

interface IPosition {
  latitude: number;
  longitude: number;
}

//------------------------------//
// PROPS INTERFACES
//------------------------------//
interface IQuiztopiaMapProps {
  userQuizzes: IUserQuizzes[];
}

interface QuizCardProps {
  userName: string;
  quizId: string;
  logPressedObject: (quizId: string) => void;
}

interface IGetQuizezDataResponse {
  success: boolean;
  quizzes?: IQuizzez[];
}

interface IQuizzesProps {
  setUserQuizzes: React.Dispatch<React.SetStateAction<IUserQuizzes[] | []>>;
}

//------------------------------//
// API RESPOONSES INTERFACES
//------------------------------//
interface ISignUpApiResponse {
  success: boolean;
  message?: string;
}

interface ILoginApiResponse {
  success: boolean;
  message?: string;
  token?: string;
}
