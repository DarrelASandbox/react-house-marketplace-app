import { GoogleIcon } from 'assets/svg';
import db from 'firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user in firebase.
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // Create user if user doesn't exist.
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
      console.log(error);
    }
  };

  return (
    <div className='socialLogin'>
      <p>
        Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with{' '}
        <button className='socialIconDiv' onClick={onGoogleClick}>
          <img className='socialIconImg' src={GoogleIcon} alt='google' />
        </button>
      </p>
    </div>
  );
};
export default OAuth;
