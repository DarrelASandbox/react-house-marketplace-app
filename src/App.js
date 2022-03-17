import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import {
  Explore,
  ForgotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
} from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/singin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
