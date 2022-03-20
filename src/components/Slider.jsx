import db from 'firebase.config';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from './Spinner';
import formatMoney from 'utils/formatMoney';

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) return <Spinner />;
  if (listings.length === 0) return <></>;

  return (
    <>
      <p className='exploreHeading'>Recommended</p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        style={{ height: '420px' }}
      >
        {listings.map(({ data, id }) => (
          <SwiperSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${id}`)}
          >
            <div
              style={{
                background: `url(${data.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            >
              <p className='swiperSlideText'>{data.name}</p>
              <p className='swiperSlidePrice'>
                {data.discountedPrice
                  ? formatMoney(data.discountedPrice)
                  : formatMoney(data.regularPrice)}{' '}
                {data.type === 'rent' && '/ month'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Slider;
