import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Thread } from "../utility/models/Thread";
import { AuthContext } from "../utility/contexts/AuthContext";
const url = import.meta.env.VITE_BASE_URL;

interface ThreadResponse {
    emails: Thread[];
    message: string;
}
export const getThreads = () => {

  const { token } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 useEffect(() => {
  axios.get<ThreadResponse>(`${url}/threads`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    console.log(response);
    if ( response.status === 200 ) {
      setEmails(response.data.emails);
      setLoading(false);
    }
  });
}, [token]);

  return { emails, loading, error };
};
