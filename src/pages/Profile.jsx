import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axios';
import { Rating } from "@material-tailwind/react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import image from "../assets/profile-icon-design-free-vector.jpg"

const Profile = () => {
    // const [image, setImage] = useState(null);
    const [prof_img, setProf_img] = useState()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        profile_image: "",
    });
    const [show, setShow] = useState(false);
    const [hoveredIndex1, setHoveredIndex1] = useState(null);
    const [hoveredIndex2, setHoveredIndex2] = useState(null);
    const [saved, setSaved] = useState([])
    const [data, setData] = useState([])
    const [savedimages, setSavedimages] = useState([])
    const [save, setSave] = useState(false)
    const [rating, setRating] = useState(0);
    const handleClose = () => setShow(false);
    const [del, setDel] = useState(false)

    const dele = async (id) => {
        try {
            await axiosInstance.post(`/saved_places/?id=${id}`);
            // console.log('Delete successful');
            setDel(!del)
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };


    const [reviewText, setReviewText] = useState('');
    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const [Id, setId] = useState()
    const handleAddReview = (value) => {
        setId(value)
        // console.log("ID is", value)
        setShow(!show)

    }
    const postReview = async () => {
        try {
            const data = {
                review: reviewText,
                place_id: Id,
                rating: rating,
            };
            await axiosInstance.post('http://127.0.0.1:8000/reviews/', data);
            // console.log('Review posted successfully');
            handleClose();
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    const handlesave = (id) => async () => {
        try {
            await axiosInstance.post('done_place/', { id });
            setSave(!save)
            // console.log("id", id)
        } catch (error) {
            console.error(error);
        }
    };    
    const handleupdate = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitupdate = async (e) => {
        try {
            await axiosInstance.post(`http://127.0.0.1:8000/update_profile/`, { ...formData, profile_image: prof_img });

        } catch (error) {
            console.error("Error:", error);
        }
        setUpdate(true);
    };

    const [done, setDone] = useState([])
    useEffect(() => {
        async function getdata() {
            try {
                const res = await axiosInstance.get('http://127.0.0.1:8000/get_done_place/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                setDone(res.data)
                // console.log("done", res.data)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata()
    }, [save])
    useEffect(() => {
        async function getdata() {
            try {
                const res = await axiosInstance.get('http://127.0.0.1:8000/profile/')
                setFormData(res.data)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [])

    console.log("Show value is ", show)
    useEffect(() => {
        async function getdata() {
            try {
                const array = [];
                const res = await axiosInstance.get('http://127.0.0.1:8000/get_saved_places/')
                res.data.map((d) => {
                    array.push(d.place.id)
                })
                setSaved(array)
                // console.log("ids", array)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [save, del])

    // console.log("img", prof_img)

    useEffect(() => {
        async function getdata() {
            try {
                const promises = saved.map(async (d) => {
                    const res = await axios.get(`http://127.0.0.1:8000/get_places/?id=${d}`);
                    return res.data;
                });
                const responseData = await Promise.all(promises);
                setData(responseData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [saved]);


    useEffect(() => {
        const images = data.map((item) => item?.images[0]?.places_image);
        setSavedimages(images);
    }, [data]);

    const [update, setUpdate] = useState(true)


    const host = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/397014/';

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    return (
        <>
            <div className='text-white h-auto mx-60'>
                <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34', display: 'flex' }}>
                    <div className="px- flex justify-center flex-col">
                        <img
                            src={image}
                            className="w-60 h-60 mx-20 my-8 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                            alt="Profile Image"
                        />
                    </div>
                    <div className="p-2 flex flex-col  flex-grow">
                        <h1 className="text-gray-600 dark:text-gray-200 font-bold" style={{ fontSize: "65px", fontFamily: 'Josefin Sans, sans-serif' }}>
                            About me
                        </h1>
                        <div className='my-5'>
                            <label htmlFor="name" className='mb-3 block text-base font-light text-white' style={{ fontSize: "30px" }}>
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={(e) => { handleupdate(e) }}
                                id="name"
                                placeholder="Full Name"
                                disabled={update ? true : false}
                                className={`  w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium ${update ? 'text-[#6B7280]' : 'text-black'}  outline-none focus:border-[#6A64F1] focus:shadow-md`}
                            />

                        </div>
                        <div className='my-5'>
                            <label htmlFor="email" className="mb-3 block text-base font-light text-white" style={{ fontSize: "30px" }}>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                id="email"
                                placeholder="email"
                                disabled={true}
                                className={` w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium text-[#6B7280]  outline-none focus:border-[#6A64F1] focus:shadow-md`}
                            />
                        </div>
                        <div className='my-5'>
                            <label htmlFor="mobile" className="mb-3 block text-base font-light text-white" style={{ fontSize: "30px" }}>
                                Mobile Number
                            </label>
                            <input
                                type="number"
                                name="phone_number"
                                id="mobile"
                                value={formData.phone_number}
                                onChange={(e) => { handleupdate(e) }}
                                placeholder="Enter your mobile number"
                                disabled={update ? true : false}
                                className={` w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium ${update ? 'text-[#6B7280]' : 'text-black '}  outline-none focus:border-[#6A64F1] focus:shadow-md`}
                            />
                        </div>
                        <div className="mt-8 flex justify-end">
                            {update ?
                                <button className="bg-teal-500 text-black px-10 py-3 rounded-full hover:bg-teal-700 dark:bg-[#54E6E6] dark:text-dark dark:hover:bg-teal-900 font-bold" onClick={() => { setUpdate(false) }}>Update Profile</button> :
                                <button className="bg-teal-500 text-black px-10 py-3 rounded-full hover:bg-teal-700 dark:bg-[#54E6E6] dark:text-dark dark:hover:bg-teal-900 font-bold" onClick={() => { submitupdate() }}>SAVE</button>
                            }

                        </div>
                    </div>
                </div>

                <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                    <h1 className='lg:text-6xl text-3xl font-bold'>Saved Trips</h1>
                    <div className='relative'>
                        <article className="card my-6 ">
                            <div className='gap-5' >
                                <div>
                                    {data.map((d, i) => (
                                        <div key={i} className='my-5 relative' onMouseEnter={() => setHoveredIndex1(i)} onMouseLeave={() => setHoveredIndex1(null)}>
                                            <img src={`http://127.0.0.1:8000/${savedimages[i]}`} alt="hi" className='h-40 w-full object-cover rounded-2xl' />
                                            <div className='absolute bottom-0 left-0 mx-5  bg-opacity-50 text-white font-bold text-4xl text-center py-2'>
                                                {data[i].name}
                                            </div>
                                            <div className=''>
                                                {hoveredIndex1 === i && (
                                                    <div className='absolute bottom-0 right-0 flex flex-row '>
                                                        <button className="font-bold p-3" style={{ backgroundColor: '#3DCC3A', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }} onClick={handlesave(d.id)}>Done</button>
                                                        <button className="font-bold p-3" style={{ backgroundColor: '#E81B1B', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }} onClick={() => dele(d.id)}>Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                    <h1 className='lg:text-6xl text-3xl font-bold'>Done Trips</h1>
                    <article className="card my-6 ">
                        <div className='gap-5' >
                            <div>
                                {done.map((d, j) => (
                                    <div key={j} className='my-5 relative' onMouseEnter={() => setHoveredIndex2(j)} onMouseLeave={() => setHoveredIndex2(null)}>
                                        <img src={`http://127.0.0.1:8000/${d?.place?.images[0]?.places_image}`} alt="hi" className='h-40 w-full object-cover rounded-2xl' />
                                        <div className='absolute bottom-0 left-0 mx-5  bg-opacity-50 text-white font-bold text-4xl text-center py-2'>
                                            {d.place.name}
                                        </div>
                                            {hoveredIndex2 === j && (
                                                <>
                                                    <div className='absolute bottom-0 right-0 flex flex-row '>
                                                        <button className="font-bold p-3" style={{ backgroundColor: '#3DCC3A', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }} onClick={()=>{handleAddReview(d.place.id)}}>Add Review</button>
                                                        {/* {console.log("hello", d.place.id)} */}
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className={`${show ? "block" : "hidden"} rounded-lg h-auto w-auto bg-red-200 flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col`}>
                <div className='flex flex-row justify-evenly gap-6 items-center m-2  '>
                    <div className='flex justify-start flex-row items-center gap-4'>
                        <h1 className='text-xl font-semibold' >Rate Your Experience</h1>
                    </div>
                    <Rating value={rating} onChange={setRating} />
                    <button onClick={() => { setShow(false) }} className='text-2xl'>X</button>
                </div>
                <div>
                    <Form className='m-5'>
                        <Form.Group className="" >
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                className="text-black col-span-2 w-96 h-20 rounded-lg p-3"
                                rows={3}
                                placeholder='Write Your Review...'
                                value={reviewText}
                                onChange={handleReviewChange}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div>
                    <Button variant="secondary" className=' bg-slate-400 m-3 p-2 rounded-md' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className=' bg-slate-600  p-2 rounded-md' onClick={postReview}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Profile;
