//------------------------------//
// INTERFACES
//------------------------------//
interface IUserState {
  loggedInUser: string;
  loggedInToken: string;
}

interface IQuizzez {
  questions: IUserQuizzes[];
  quizId: string;
  userId: string;
  username: string;
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
  setNewQuestionLat: React.Dispatch<React.SetStateAction<number>>;
  setNewQuestionLon: React.Dispatch<React.SetStateAction<number>>;
  userQuizzes: IUserQuizzes[];
  isAddNewQuestionSliderOpen: boolean;
}

interface IQuizCardProps {
  userName: string;
  quizId: string;
  fetchAndProcessQuizData: (clickedQuizCardId: string) => void;
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
