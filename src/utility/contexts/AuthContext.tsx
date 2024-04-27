import { createContext, useState } from "react";

interface User {
  id     : number;
  name   : string;
  surname: string;
  email  : string;
  role   : string;
  team_id: number;
}
interface Auth {
  token: string;
  user : User;
  team : {
    addresses: string[];
    name     : string;
    members  : User[];
  };
}
const AuthContext = createContext({
  auth              : {} as Auth,
  setAuth           : (auth: Auth | any) => { },
  isAuthenticated   : false,
  setIsAuthenticated: (isAuthenticated: any) => { },
});

function AuthProvider({ children }) {

  const [auth, setAuth]                       = useState<Auth>({} as Auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuthenticated, setIsAuthenticated}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
