import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swiper from '../components/Swiper';
import Recommendation from '../components/Recommendation';
import { Link } from 'react-router-dom';

const Discover = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getdata() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/get_best_places/')
                // console.log(res.data)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getdata()
    }, []);

    return (
        <div className='text-white h-auto mx-11'>
            <div className='mx-20 my-10 '><Swiper /></div>
            <div className='h-auto rounded-xl p-9 ' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl'>Best Destination</h1>
                <div className='grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-4 my-12 sm:mx-5 lg:mx-16 justify-items-center'>
                    {data.length > 0 && data.map((d, i) => (
                        <Link to={`/places/${d.id}`}><img key={i} className='xl:h-96 xl:w-72 lg:h-72 lg:w-60 md:h-52 h-40 w-32 md:w-40 rounded-2xl' src={`http://localhost:8000/${d?.images[0]?.places_image}`} alt="" /></Link>
                    ))}
                </div>
            </div>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl'>Recommended</h1>
                <div className='lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-5 flex flex-row overflow-auto md: my-12 justify-items-center lg:mx-20'>
                    <Recommendation showIcon={false} />
                </div>
            </div>
        </div>
    );
};

export default Discover;
