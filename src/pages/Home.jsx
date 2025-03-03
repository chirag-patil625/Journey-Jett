import React, { useEffect, useState } from 'react';
import bg from "../assets/bg pic.svg";
import rect from "../assets/Rectangle 19.svg";
import wildlife from "../assets/Sunny.svg";
import adventure from "../assets/Rainy.png";
import beach from "../assets/Winter.png";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import img1 from "../assets/one-day-pune-to-khandala-and-lonavala-tour-package-by-private-cab-header-1568x1045.webp"
import img2 from "../assets/1200px-Khajuraho_Group_of_Monuments_4.jpg"
import img3 from "../assets/1538058668.jpg"

const Home = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState([]);
    const [inputFilter, setInputFilter] = useState([]);
    const [v1, setV1] = useState("");
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [weather, setWeather] = useState('')
    const [isHovering, setIsHovering] = useState(false);

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    
    const handleweather = (value) => {
        setWeather(value)
        // console.log("weather", value)
        navigate('/explore', { state: {weather: value}})
    }
    // console.log(weather)

    const handleInputFocus1 = () => {
        setFocus1(true);
        setFocus2(false);
    };

    const handleInputFocus2 = () => {
        setFocus2(true);
        setFocus1(false);
    };

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/get_destinations/');
                setInput(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    const handleFilter = (value) => {
        const filteredInput = input.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
        setInputFilter(filteredInput);
    };
    

    const handlevalue = (value) => {
        setV1(value);
        navigate('/explore', { state: { v1: value } });
    }

    return (
        <>
            <div>

                <img className='relative h-full w-full object-cover' src={bg} />
                <div className='absolute     mt-2 top-20 sm:top-1/3  left-1/2 transform -translate-x-1/2  text-white sm:text-6xl font-thin text-center'>
                    Journey Jett Where Dreams <br /> Take Flight
                </div>
            </div>
            <div className=' relative bg-white bg-opacity-25 w-auto ' style={{ marginTop: '-20px' }}>
                <div className='sm:grid grid-cols-4 gap-4 p-2 sm:m-3  h-auto'>
                    <div className='p-5 m-2 bg-white rounded-2xl h-auto'>
                        <div className='text-xl'>From</div>
                        <div>
                            <div className='flex flex-row  rounded-2xl'>
                                <input type="text" className={` w-full h-12 font-bold text-5xl ${focus1 ? "" : ""}`} onFocus={() => handleInputFocus1()} onChange={(e) => handleFilter(e.target.value)} />
                                <button className=' flex justify-center items-center px-3 text-xl pe-5 pt-2' onClick={() => setFocus1(false)}>{focus1 ? <ImCross /> : <FaSearch />}</button>
                            </div>

                        </div>
                    </div>
                    <div className='p-5 m-2 bg-white rounded-2xl h-auto'>
                        <div className='text-xl'>To</div>
                        <div>
                            <div className='flex flex-row  rounded-2xl'>
                                <input type="text" className={` w-full h-12 font-bold text-5xl ${focus2 ? "outline" : ""}`} onFocus={() => handleInputFocus2()} onChange={e => handleFilter(e.target.value)}  />
                                <button className=' flex justify-center items-center px-3 text-xl pe-5 pt-2' onClick={() => setFocus2(false)}>{focus2 ? <ImCross /> : <FaSearch />}</button>
                            </div>
                            <div className={`bg-white ${focus2 ? "block" : "hidden"} flex flex-col max-h-20  overflow-y-scroll border-2 rounded-2xl w-64`} style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#ccc transparent'
                                }}>
                                    {inputFilter.map((d, i) => (
                                        <button key={i} className='p-3 border-2 border-gray-200 rounded-2xl' onClick={() => handlevalue(d.name)}>
                                            <h1 className=' font-bold text-3xl '>{d.name}</h1>
                                        </button>
                                    ))}

                                </div>
                        </div>
                    </div>
                    <div className='p-7 m-2 bg-white rounded-2xl h-auto'>
                        <div className=' text-xl'>Date</div>
                        <div>
                            <input type="date" className='my-2 w-full h-12 text-bold text-4xl ' />
                        </div>
                    </div>
                    <div className=' m-2 bg-white rounded-2xl h-auto'>
                        <button className='bg-[#295476] w-full  text-white rounded-2xl text-6xl font-bold p-11 h-auto'>Search</button>
                    </div>
                </div>
            </div>
            <div className='text-white sm:text-8xl mt-7 mx-auto sm:mt-48 text-center' >
                Explore Top<br />
                Destinations To Travel<br />
                Based On Environmental<br />
                Condition
            </div>
            <div className='text-white text-xl sm:text-3xl text-center mt-9 sm:mt-20 font-thin'>
                Get professional guidance, practical travel advice, comprehensive destination details, and motivation <br /> from us to plan and reserve your ideal vacation.
            </div>
            <div className='grid grid-cols-3 gap-6 mt-10 mx-40 m-10 justify-items-center' style={{cursor:'pointer'}}>
                    <img onClick={() => { handleweather('Summer') }} src={wildlife} alt="" className={`row-span-1 h-full `} />
                    <img onClick={() => { handleweather('Rainy') }} src={adventure} alt="" className='row-span-1 h-full w-full'/>
                    <img onClick={() => { handleweather('Winter') }} src={beach} alt="" className='row-span-1 h-full w-full'/>
                </div>
            <div className='grid sm:grid-cols-2 mt-4 sm:mt-40 md:gap-52'>
                <div className='text-white md:ms-40 '>
                    <h1 className=' text-4xl text-center sm:text-5xl mb-10'>Best of the week </h1>
                    <h1 className='text-center text-sm px-9 sm:text-base'>We're sharing the latest information on the best places to <br />travel right nowt many countries have opened their doors to <br />tourists in recent weeks.</h1>
                </div>
                <div className='flex flex-row gap-8 mt-4 justify-center'>
                    <img src={img1} alt="" className='rounded-full sm:h-32 h-20 w-28' />
                    <img src={img2} alt="" className='rounded-full sm:h-32 h-20 w-28 md:mt-28' />
                    <img src={img3} alt="" className='rounded-full sm:h-32 h-20 w-28 ' />
                </div>
            </div>
        </>
    );
};

export default Home;