import { HomeIcon } from 'assets/svg';
import KeyboardArrowRightIcon from 'assets/svg/keyboardArrowRightIcon.svg';
import db from 'firebase.config';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      if (
        auth.currentUser.displayName !== name ||
        auth.currentUser.email !== email
      ) {
        await updateProfile(auth.currentUser, { displayName: name });
        await updateEmail(auth.currentUser, email);

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name, email });

        toast.success('Profile updated!');
      }
    } catch (error) {
      toast.error('Could not update profile details.');
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>Profile</p>
          <button type='button' className='logOut' onClick={onLogout}>
            Logout
          </button>
        </header>

        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>Personal Details</p>
            <p
              className='changePersonalDetails'
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? 'done' : 'change'}
            </p>
          </div>

          <div className='profileCard'>
            <form action=''>
              <input
                type='text'
                id='name'
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type='text'
                id='email'
                className={
                  !changeDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>

          <Link to='/create-listing' className='createListing'>
            <img src={HomeIcon} alt='home' />
            <p>Sell or rent your home.</p>
            <img src={KeyboardArrowRightIcon} alt='arrow right' />
          </Link>
        </main>
      </div>
    </>
  );
};
export default Profile;
