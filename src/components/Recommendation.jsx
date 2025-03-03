import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Place_card from './Place_card'

const Recommendation = () => {
    const [data, setData] = useState();
    useEffect(() => {
        async function getdata() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/recommendations/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setData(res.data.recommendations);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, []);

    const [info, setInfo] = useState([]);
    useEffect(() => {
        async function getdata() {
            try {
                if (data) {
                    let infoArray = [];
                    for (const id of data) {
                        const res = await axios.get(`http://127.0.0.1:8000/get_places/?id=${id}`);
                        infoArray.push(res.data);
                    }
                    setInfo(infoArray);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [data]);

    return (
        <>
            {
                info && info.map((d, i) => (
                    <div key={i}><Place_card  place={d.id} height={"xl:h-60 h-20 sm:h-32 md:h-40 lg:h-42 "} img={d.images?.[0]?.places_image} title={d.name} desc={d.info} city={d.city} state={d.state} /></div>
                ))
            }
        </>
    )
}

export default Recommendation;
