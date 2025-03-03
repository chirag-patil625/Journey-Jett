import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer"
import Chatbot from "../components/Chatbot"

function BaseLayout() {
  return (
    <>
      <div className=" h-screen">
        <nav className="">
          <Navbar/>
        </nav>
        <div className=" overflow-x-hidden" style={{ backgroundColor: '#051120' }}>
          <Outlet />
          <Footer/>
          <Chatbot/>
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
