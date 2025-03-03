import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/swiper-bundle.css'; 
import { useParams } from 'react-router-dom';
import 'swiper/css/navigation';
import { Navigation , Pagination} from 'swiper/modules';


export default function App() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_places/');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const destination = data.find(item => item.id === parseInt(id, 10));

  return (
    <Swiper
      spaceBetween={30}
      modules={[Pagination,Navigation]}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className='rounded-2xl h-100 w-100'
    >
      {destination && destination.images.map(image => (
        <SwiperSlide key={image.id}>
          <img src={`http://127.0.0.1:8000${image.places_image}`} alt="hii" className='w-full h-full'/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
