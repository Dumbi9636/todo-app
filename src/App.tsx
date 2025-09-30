import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from "react-router-dom";
import { Todo } from '../electron/types/types';
import AppNavBar from "./components/NavBar";

// Type 선언 
interface ApiType{
  getTodoList: () => Promise<Todo[]>;
  addTodo: (title: string, comment: string, t: string) => Promise<boolean>;
  toggleTodo: (id: number) => Promise<boolean>;
}

// 전역 설정
declare global{
  interface Window{
    api:ApiType
  }
}

function App() {

  //현재 경로에 맞는 자식 route compoent 를 반환 한다 
  const currentOutlet=useOutlet();


  return <>
    <AppNavBar />
    <div className="container-fluid mt-5 pt-5">
      {currentOutlet}
    </div>
  </>
  
}

export default App
