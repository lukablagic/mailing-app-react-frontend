import { createContext, useState } from "react";

const AuthContext = createContext({
  auth: {},
  setAuth: (auth: {}) => {},
  token: "",
  setToken: (token: any) => {},
  user: null,
  setUser: (user: any) => {},
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, token, setToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
