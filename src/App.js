import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/signup/signup';
import AddNewTask from './Components/Task/AddNewTas';
import Firstpage from './Pages/Firstpage';
import Mytasklist from './Components/Task/Taskcomponent';
import TaskDetails from './Components/Task/TaskDetails';
import UpdateTask from './Components/Task/EditTask';
import Signin from './Pages/login/signin';
import ForgotPassword from './Pages/ForgotPassword/Forgot';
import ResetPassword from './Pages/ResetPassword/ResetPassword';



function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={<Firstpage/>}/>
        <Route path='/addtask' element={<AddNewTask/>}/>
        <Route path='/detailtask/:id' element={<TaskDetails/>}/>
        <Route path='/edittask/:id' element={<UpdateTask/>}/>
        <Route path='/login' element={<Signin/>} />
        <Route path='/dashboard' element={<Mytasklist/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/resetpassword/:id/:token'element={<ResetPassword/>} />
       </Routes>
    </div>
  );
}

export default App;
