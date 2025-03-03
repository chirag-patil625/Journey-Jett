import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App() {

  const navigate = useNavigate()

  const [image, getImage] = useState([])
  useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/get_event/')
        // console.log(res.data)
        getImage(res.data)
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata();
  }, [])
  return (
    <>
        <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="mySwiper text-white rounded-full" style={{ height: "350px" }}>
          Link{image.map((d) => (
            <SwiperSlide onClick={()=>{navigate(`/events/${d.id}`)}} style={{cursor:'pointer'}}><img className='w-full object-cover' src={`http://127.0.0.1:8000${d.photo}`} alt="hi" /></SwiperSlide>
          ))}
        </Swiper>
    </>
  );
}
