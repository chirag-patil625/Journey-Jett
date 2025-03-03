import React, { useState } from 'react';
import img from "../../assets/login img.svg";
import { FaGoogle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        username: "",
        phone_no: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    };

    const handleSave = (event) => {
        if (event) {
            event.preventDefault();
        }

        axiosInstance
            .post(`/signup/`, {
                email: formdata.email,
                username: formdata.username,
                phone_no: formdata.phone_no,
                password: formdata.password,
            })
            .then((res) => {
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                axiosInstance.defaults.headers["Authorization"] =
                    "JWT " + localStorage.getItem("access_token");
                navigate("/explore");
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Error", error);
            });
    };

    const [showpassword, setShowPassword] = useState(false);

    return (
        <div className='h-screen p-10 overflow-hidden' style={{ backgroundColor: '#051120' }}>
            <div className='lg:h-full w-100 flex flex-row xl:mx-48 mx-2 rounded-3xl' style={{ backgroundColor: '#22405b' }}>
                <img src={img} alt="Login Image" className='rounded hidden lg:block' />
                <div className='text-white flex  items-center w-full flex-col'>
                    <h1 className=' md:text-4xl text-2xl mt-8 italic border-4 border-white p-8 md:p-8 lg:p-2 xl:p-8 rounded-3xl h-min lg:w-96 w-auto  flex justify-center items-center md:mt-8 font-medium'>Journey Jett</h1>
                    <Link><FaGoogle className=' size-14 my-6' /></Link>
                    <div className='w-full flex justify-center'>
                        <input type="text" placeholder='Name' name="username" onChange={(e) => { handleChange(e) }} className='text-white bg-transparent border-white py-2 w-4/6 text-2xl focus:outline-none ' style={{ borderBottom: '2px solid white' }} />
                        <button><IoMdPerson className='size-5' /></button>
                    </div>
                    <div className='w-full flex justify-center'>
                        <input type="tel" placeholder='Phone' name="phone_no" onChange={(e) => { handleChange(e) }} className='text-white bg-transparent border-white py-2 w-4/6 text-2xl focus:outline-none ' style={{ borderBottom: '2px solid white' }} />
                        <button><MdOutlineLocalPhone className='size-5' /></button>
                    </div>
                    <div className='w-full flex justify-center'>
                        <input type="text" placeholder='E-mail' name="email" onChange={(e) => { handleChange(e) }} className='text-white bg-transparent border-white py-2 w-4/6 text-2xl focus:outline-none my-2' style={{ borderBottom: '2px solid white' }} />
                        <button ><MdOutlineMailOutline className=' size-5' /></button>
                    </div>
                    <div className='w-full flex justify-center'>
                        <input type={showpassword ? "text" : "password"} name="password" onChange={(e) => { handleChange(e) }} placeholder='Password' className='text-white bg-transparent border-white py-2  w-4/6 text-2xl focus:outline-none' style={{ borderBottom: '2px solid white' }} />
                        <button onClick={() => setShowPassword(!showpassword)}>{showpassword ? <FaRegEyeSlash className=' size-5' /> : <FaRegEye className=' size-5' />}</button>
                    </div>
                    <button className='my-5 py-3 px-10 rounded-full text-2xl' onClick={() => handleSave()} style={{ backgroundColor: '#1598ff' }}>Signup</button>
                    <Link to="/login" className='mb-2'>Already A user? Login</Link>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Register;