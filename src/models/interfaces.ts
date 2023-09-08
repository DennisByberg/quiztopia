//------------------------------//
// INTERFACES
//------------------------------//
interface IUserState {
  loggedInUser: string;
  loggedInToken: string;
}

interface IMyQuizzes {
  quizId: string;
  userName: string;
}

interface IQuizzez {
  questions: IUserQuizzes;
  quizId: string;
  userId: string;
  username: string;
}

interface IMapPosition {
  lat: number;
  lng: number;
}

interface IQuestions {
  question: string;
  answer: string;
  location: ILocation;
}

interface ILocation {
  longitude: number;
  latitude: number;
}

interface IUserQuizzes {
  [x: string]: any; // Används för att kunna använda every.

  question: string;
  answer: string;
  location: {
    latitude: number;
    longitude: number;
  };
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

interface IAddNewQuestionToQuizFormProps {
  newQuestionLon: number;
  newQuestionLat: number;
  setIsAddNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICreateNewQuizSliderProps {
  setisCreateNewQuizSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IQuizCardProps {
  userName: string;
  quizId: string;
  fetchAndProcessQuizData: (clickedQuizCardId: string) => void;
}

interface IQuizzesProps {
  setUserQuizzes: React.Dispatch<React.SetStateAction<IUserQuizzes[] | []>>;
}

interface IMyQuizzesProps {
  myQuizzesComponent: IMyQuizzes[];
  setMyQuizzesComponent: React.Dispatch<React.SetStateAction<IMyQuizzes[]>>;
}

//------------------------------//
// API RESPONSES INTERFACES
//------------------------------//
interface ISignUpApiResponse {
  success: boolean;
  message?: string;
}

interface IGetQuizezDataResponse {
  success: boolean;
  quizzes?: IQuizzez[];
}

interface ILoginApiResponse {
  success: boolean;
  message?: string;
  token?: string;
}

interface ICreateQuizResponse {
  success: boolean;
  message?: string;
  quizId?: string;
}
