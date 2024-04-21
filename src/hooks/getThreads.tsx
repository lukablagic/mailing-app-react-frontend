import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Thread } from "../utility/models/Thread";
import { AuthContext } from "../utility/contexts/AuthContext";
import { useNavigation } from "./Navigation";
const url = import.meta.env.VITE_BASE_URL;

interface ThreadResponse {
  emails: Thread[];
  message: string;
}

export const getThreads = () => {

  const { auth } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {endpoints} = useNavigation();
  useEffect(() => {
    
    const params = {
    folder: endpoints[3] !== undefined ? endpoints[3] : "inbox",
    };
    
    axios
      .get<ThreadResponse>(`${url}/threads/all`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params
      })
      .then((response) => {
        if (response.status === 200) {
          setEmails(response.data.emails);
          setLoading(false);
        }
      });

  }, [auth.token, endpoints]);

  return { emails, loading, error };
};
