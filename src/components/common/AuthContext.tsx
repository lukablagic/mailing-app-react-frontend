import React, { createContext, useState } from 'react';
import { Toast } from 'react-bootstrap';


 const AuthContext = createContext({
    login: (email: string, password: string) => {},
    logout: () => {},
});

function AuthProvider ({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const login = (email, password) => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
    };
   
  
 
  
    return (
      <AuthContext.Provider value={{ login, logout }}>
        {children}      
      </AuthContext.Provider>
);
  }
  

export { AuthContext, AuthProvider };
