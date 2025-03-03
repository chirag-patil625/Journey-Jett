import React, { useEffect, useState } from 'react';
import bg from "../assets/bg pic.svg";
import rect from "../assets/Rectangle 19.svg";
import wildlife from "../assets/Wildlife.jpg";
import adventure from "../assets/adventure.jpg";
import beach from "../assets/beach.jpg";
import hill from "../assets/hill.jpg";
import heritage from "../assets/heritage.jpg";
import pilgrimage from "../assets/Pilgrimage.jpg";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState([]);
    const [inputFilter, setInputFilter] = useState([]);
    const [v1, setV1] = useState("");
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [place, setPlace] = useState('');

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
        const response = input.filter(f => f.name.includes(value));
        setInputFilter(response);
    };

    const handlevalue = (value) => {
        setV1(value);
        // console.log("v1:", value); // Log the value here
        navigate('/explore', { state: { v1: value } });
    }
    
    // Testing 


    // const [islogin, setislogin] = useState(false);
    // const [isuser, setisUser] = useState(false);
    // const [onpage, setPage] = useState('');

    // const getUserInfoFromToken = (token) => {
    //     try {
    //         const decodedToken = jwtDecode(token);
    //         const { user_id } = decodedToken;  // Assuming username and email are stored in the token payload
    //         return { user_id };
    //     } catch (error) {
    //         console.error('Error decoding JWT token:', error);
    //         return null;
    //     }
    // };

    // const token = localStorage.getItem('refresh_token');  // Replace with the actual token
    // const userInfo = getUserInfoFromToken(token)
    // useEffect(() => {
    //     if (userInfo) {
    //         setisUser(userInfo.user_id)
    //         // setisUser(userInfo)
    //     }
    // }, [userInfo])
    // console.log(isuser)
    
    // useEffect(() => {
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     setislogin(!!refreshToken); // Set true if refreshToken exists, false otherwise
    // }, []);

    return (
        <>
            <div className='md:h-auto w-screen'>
                <div>
                    <img className='relative h-full w-full object-cover' src={bg} alt="bg" />
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center'>
                        Journey Jett Where Dreams <br /> Take Flight
                    </div>
                </div>
                <div className='relative bg-white bg-opacity-25 ' style={{ marginTop: '-50px' }}>
                    <div className='grid grid-cols-4 py-5 justify-center mx-40 md:gap-10 h-40'>
                        <div className='p-5 bg-white rounded-2xl h-32'>
                            <h1 className='text-2xl'>From</h1>
                            <div>
                                <div className='flex flex-row border-2 rounded-2xl'>
                                    <input type="text" className={` w-full h-12 rounded-2xl border-2 ${focus1 ? "outline" : ""}`} onFocus={() => handleInputFocus1()} onChange={(e) => handleFilter(e.target.value)} />
                                    <button className=' flex justify-center items-center px-3 text-xl pe-5 pt-2' onClick={() => setFocus1(false)}>{focus1 ? <ImCross /> : <FaSearch />}</button>
                                </div>
                                <div className={`bg-white ${focus1 ? "block" : "hidden"} flex flex-col max-h-40 h-auto overflow-y-scroll border-2 rounded-3xl `} style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#ccc transparent'
                                }}>
                                    {inputFilter.map((d, i) => (
                                        <button key={i} className='p-3' >
                                            {d.name}
                                        </button>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className='p-5 bg-white rounded-2xl h-32'>
                            <h1 className='text-2xl'>To</h1>
                            <div>
                                <div className='flex flex-row border-2 rounded-2xl'>
                                    <input type="text" className={` w-full h-12 rounded-2xl border-2 ${focus2 ? "outline" : ""}`} onFocus={() => handleInputFocus2()} onChange={e => handleFilter(e.target.value)} />
                                    <button className=' flex justify-center items-center px-3 text-xl pe-5 pt-2' onClick={() => setFocus2(false)}>{focus2 ? <ImCross /> : <FaSearch />}</button>
                                </div>
                                <div className={`bg-white ${focus2 ? "block" : "hidden"} flex flex-col max-h-40 h-auto overflow-y-scroll border-2 rounded-2xl `} style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#ccc transparent'
                                }}>
                                    {inputFilter.map((d, i) => (
                                        <button key={i} className='p-3' onClick={() => handlevalue(d.name)}>
                                            {d.name}
                                        </button>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className='p-5 bg-white rounded-2xl h-32'>
                            <h1 className=' text-2xl'>Date</h1>
                            <div>
                                <input type="date" className='my-3 w-full h-12 rounded-2xl border-2' />
                            </div>
                        </div>
                        <button className='bg-blue-900 w-60 text-white rounded-2xl text-3xl font-bold h-full'>Search</button>
                    </div>
                </div>

                <div className='text-white text-8xl mx-auto mt-48 text-center' >
                    Explore Top<br />
                    Destinations To Travel<br />
                    Based On Environmental<br />
                    Condition
                </div>
                <div className='text-white text-3xl text-center mt-20 font-thin'>
                    Get professional guidance, practical travel advice, comprehensive destination details, and motivation <br /> from us to plan and reserve your ideal vacation.
                </div>
                <div className='grid grid-cols-3 gap-6 mt-10 mx-40 m-10 justify-items-center'>
                    <img src={wildlife} alt="" className='row-span-1  ' />
                    <img src={adventure} alt="" className='row-span-1 h-full w-full ' />
                    <img src={beach} alt="" className='row-span-1 h-full w-full ' />
                    <img src={hill} alt="" className='row-span-1 h-full w-full ' />
                    <img src={heritage} alt="" className='row-span-1 h-full w-full ' />
                    <img src={pilgrimage} alt="" className='row-span-1 h-full w-full ' />
                </div>
                <div className='flex flex-row mt-40 md:gap-52'>
                    <div className='text-white md:ms-40 '>
                        <h1 className=' text-5xl mb-10'>Best of the week </h1>
                        <h1>We're sharing the latest information on the best places to <br />travel right nowt many countries have opened their doors to <br />tourists in recent weeks.</h1>
                    </div>
                    <div className='flex flex-row gap-8'>
                        <img src={rect} alt="" className='rounded-full h-32 ' />
                        <img src={rect} alt="" className='rounded-full h-32 md:mt-28' />
                        <img src={rect} alt="" className='rounded-full h-32 ' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
