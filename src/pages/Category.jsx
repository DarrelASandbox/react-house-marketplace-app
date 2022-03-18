import Spinner from 'components/Spinner';
import db from 'firebase.config';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingItem from 'components/ListingItem';

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, 'listings');
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) =>
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        );

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings.');
      }
    };
    fetchListings();
  }, [params.categoryName]);

  const displayList =
    !loading && listings.length === 0 ? (
      <p>No listings.</p>
    ) : (
      <main>
        <ul className='categoryListings'>
          {listings.map((listing) => (
            <ListingItem
              listing={listing.data}
              id={listing.id}
              key={listing.id}
            />
          ))}
        </ul>
      </main>
    );

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>

      {loading ? <Spinner /> : displayList}
    </div>
  );
};
export default Category;
