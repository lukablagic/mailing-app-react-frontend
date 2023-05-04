import React, { createContext, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';


const AuthContext = createContext({
  auth: {},
  setAuth: (auth: {}) => {},
  token:  "",
  setToken: (token: any) => {},
});


function AuthProvider ({ children }) {
 
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  return (
    <AuthContext.Provider value={{ auth, setAuth ,token, setToken}}>
        {children}      
      </AuthContext.Provider>
);
  }
  

export { AuthContext, AuthProvider };
