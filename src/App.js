import PrivateRoute from 'components/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import {
  Category,
  CreateListing,
  Explore,
  ForgotPassword,
  Offers,
  Profile,
  SignIn,
  SignUp,
  Listing,
} from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/create-listing'
            element={
              <PrivateRoute>
                <CreateListing />
              </PrivateRoute>
            }
          />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
