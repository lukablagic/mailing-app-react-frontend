import React, { createContext, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';


const AuthContext = createContext({
  auth: {},
  setAuth: (auth: {}) => {},
  token:  "",
  setToken: (token: any) => {},
  user:  [],
  setUser: (user: any) => {},
});


function AuthProvider ({ children }) {
 
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState([]);
  return (
    <AuthContext.Provider value={{ auth, setAuth ,token, setToken,user,setUser}}>
        {children}      
      </AuthContext.Provider>
);
  }
  

export { AuthContext, AuthProvider };
