import React, { useState, useEffect } from 'react';
import ExampleContext from './Context';
import { jwtDecode } from 'jwt-decode';

const State = (props) => {
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [onpage, setPage] = useState('');
  const [isuser, setIsuser] = useState();

    const getUserInfoFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const { user_id } = decodedToken;  // Assuming username and email are stored in the token payload
            return { user_id };
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    };

    const token = localStorage.getItem('refresh_token');  // Replace with the actual token
    const userInfo = getUserInfoFromToken(token)
    useEffect(() => {
        if (userInfo) {
          setIsuser(userInfo.user_id)
        }
    }, [userInfo])

    const contextValue = {
      username:username,
      setUsername:setUsername,
      userid:userid,
      setUserid:setUserid,
      isLogin: isLogin,
      setLogin: setLogin,
      onpage: onpage,
      setPage: setPage,
    };

    // console.log(username)
    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        setLogin(!!refreshToken); // Set true if refreshToken exists, false otherwise
    }, [token]);

  return <ExampleContext.Provider value={contextValue}>{props.children}</ExampleContext.Provider>;
};

export default State;
