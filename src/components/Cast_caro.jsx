import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function App() {

    const {id} = useParams()
    // console.log(id)
    const [data, setData] = useState([])
    useEffect(()=>{
        async function getdata() {
          try {
            const res = await axios.get(`http://127.0.0.1:8000/get_event/?event_id=${id}`)
            setData(res.data.cast_image)
            // console.log(res.data)
          } catch (error) {
            console.log(error)
          }
        }
        getdata()
    },[])
  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination ,Navigation]}
        className="mySwiper text-white rounded-full"
      >{data.map((d,i)=>(
        <SwiperSlide key={i}><img className='rounded-full w-36 h-36' src={`http://127.0.0.1:8000${d.cast_image}`} alt="" /></SwiperSlide>
      ))}
        
      </Swiper>
    </>
  );
}
