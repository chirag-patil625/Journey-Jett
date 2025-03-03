import React, { useEffect, useState } from 'react';
import img from "../assets/Sunny.svg"
import axios from 'axios';
import { ThreeDot } from 'react-loading-indicators';
import chatbot from "../assets/chatbot.png"
function Message({ text }) {
  return (
    <div className='flex-grow flex justify-end my-2'>
      <div className='flex flex-row items-start gap-2 '>
        <div className='max-w-52 bg-green-500 rounded-lg p-2 text-wrap break-words'>
          {text}
        </div>
        <img className='border-2 border-black rounded-full' src={img} alt="" style={{ height: '40px', width: '40px' }} />
      </div>
    </div>
  );
}

function Botmsg({ text, hi, usrmsg, fn }) {
  const handlebutton = (prompt) => {
    usrmsg(prompt);
    console.log("prompt",prompt);
    fn()
  };
  return (
    <div className='fles flex-col'>
      <div className='flex flex-row items-start gap-2 my-2'>
        <img className='border-2 border-black rounded-full ' src={img} alt="" style={{ height: '40px', width: '40px' }} />
        <div className=' max-w-56 w-auto bg-green-500 rounded-lg p-2 h-auto'>
          {text === "" ? <ThreeDot  color="#000000" size="small"/> : text}
        </div>
      </div>
      {/* <div className='gap-3 grid  w-60 ms-12'>
        {hi && hi.map((d, i) => (
          <button className='border-2 border-black p-1 rounded-lg hover:bg-gray-200' key={i} onClick={()=>{handlebutton(d.name)}}>{d.name}</button>
        ))}
      </div> */}
    </div>

  );
}

function Chatbot() {
  const [show, setShow] = useState(false);
  const [usermsg, setUsermsg] = useState("");
  const [response, setResponse] = useState([]);
  const [chat, setChat] = useState([]);

  const btn = [
    { name: "Taj Mahal" },
    { name: "hii" },
    { name: "Agra" },

  ]

  const handleInputChange = (e) => {
    setUsermsg(e.target.value);
  };

  // console.log("usermsg co",usermsg)

  const handleSendMessage = () => {
    const updatedChat = [...chat, { req:usermsg, res:'' }];
    setChat(updatedChat);
    console.log("Usersg is 1",updatedChat)
    axios.post('http://127.0.0.1:8000/chat/', { user_input:usermsg })
      .then((res) => {
        const botResponse = res.data.response;
        setResponse(prevResponse => [...prevResponse, { message: botResponse }]);
        updatedChat[updatedChat.length - 1].res = botResponse;
        setChat(updatedChat);

      })
      .catch((error) => {
        console.log(error)
      });
    setUsermsg("") 
  };


  return (
    <>
      <div className=' Chatbot flex rounded-lg' style={{ position: 'fixed', bottom: '80px', right: '50px', backgroundColor: 'white' }}>
        <div className={` flex-col rounded-lg`} style={{ height: '500px', width: '400px', display: show ? 'block' : 'none', opacity: show ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
          <div className='bg-green-500 h-12 w-full flex justify-start items-center rounded-t-lg' >
            <img src={chatbot} alt="" className='w-12 h-12 ms-3' />
            <h1 className='mx-3 font-semibold'>Chat Support</h1>
          </div>
          <div className='h-96 overflow-auto px-1' >
            <Botmsg text={"Hello, How Can I Help!"} />
            {/* <div className='gap-3 grid w-52 ms-12'>
              {btn && btn.map((d, i) => (
                <button className='border-2 border-gray-300 text-gray-500 p-1 w-auto rounded-lg hover:bg-gray-200 hover:border-gray-200 hover:text-black ' key={i} onClick={() => { setUsermsg(d.name) }}>{d.name}</button>
              ))}
            </div> */}
            {
              chat.map((d, i) => (
                <div key={i}>
                  <Message text={d.req} />
                  <Botmsg text={d.res} hi={btn} usrmsg={setUsermsg} fn={handleSendMessage} />
                </div>
              ))
            }
          </div >
          <div className='rounded-b-lg px-3 bg-green-500' style={{ position: 'absolute', bottom: '0', left: '0', right: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <input className='p-2 border-2 my-2 mx-3 border-black w-full rounded-full focus:outline-none' onChange={handleInputChange} value={usermsg} type="text" placeholder='Ask Something....' />
            <button className='mx-2' onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button onClick={() => setShow(!show)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Chat
        </button>
      </div>
    </>
  );
}

export default Chatbot;
