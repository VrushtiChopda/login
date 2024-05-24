import './App.css';
import Email from './components/forgot password/Email';
import Login from './components/login/Login';
import Otp from './components/forgot password/Otp';
import PageNotFound from './components/PageNotFound';
import Registration from './components/registration/Registration';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UpdatePassword from './components/forgot password/UpdatePassword';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/otp' element={<Otp />}></Route>
          <Route path='/email' element={<Email />}></Route>
          <Route path='/update' element={<UpdatePassword />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
