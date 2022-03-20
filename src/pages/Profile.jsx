import { HomeIcon } from 'assets/svg';
import KeyboardArrowRightIcon from 'assets/svg/keyboardArrowRightIcon.svg';
import ListingItem from 'components/ListingItem';
import db from 'firebase.config';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

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

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const storage = getStorage();
      const imagesToDelete = listings.filter(
        (listing) => listing.id === listingId
      );

      const imagesArray = imagesToDelete[0].data.imageUrls;

      await imagesArray.forEach((urlToDelete) => {
        //Get the filename from the upload URL
        let fileName = urlToDelete.split('/').pop().split('#')[0].split('?')[0];
        fileName = fileName.replace('%2F', '/'); // Replace "%2F" in the URL with "/"

        const imageToDeleteRef = ref(storage, `${fileName}`);

        deleteObject(imageToDeleteRef)
          .then(() => toast.success('Images deleted'))
          .catch((error) => {
            console.log(error);
            toast.error('Failed to delete images');
          });
      });

      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success('Sucesfully deleted offer');
    }
  };

  const onEdit = () => {};

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

          {!loading && listings?.length > 0 && (
            <>
              <p className='listingText'>Your Listings</p>
              <ul className='listingsList'>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
};
export default Profile;
