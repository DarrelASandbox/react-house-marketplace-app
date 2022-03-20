import ListingItem from 'components/ListingItem';
import Spinner from 'components/Spinner';
import db from 'firebase.config';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [lastFetchedListing, setLastFetchedListing] = useState([]);

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

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

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

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];
      querySnap.forEach((doc) =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings.');
    }
  };

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

  const loadMore = (
    <>
      <br />
      <br />
      {lastFetchedListing && (
        <p className='loadMore' onClick={onFetchMoreListings}>
          Load More
        </p>
      )}
    </>
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
      {loadMore}
    </div>
  );
};
export default Category;
