import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // https://firebase.google.com/docs/reference/js/auth.auth.md#authonauthstatechanged
  // https://firebase.google.com/docs/reference/js/firestore_.unsubscribe
  // https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setLoggedIn(true);
      setCheckingStatus(false);
    });
    return unsub;
  }, []);

  return { loggedIn, checkingStatus };
};
export default useAuthStatus;
