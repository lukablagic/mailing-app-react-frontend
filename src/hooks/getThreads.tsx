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

  const { auth }              = useContext(AuthContext);
  const [emails, setEmails]   = useState([]);
  const [folder, setFolder]   = useState<string>("INBOX");
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [error, setError]     = useState(false);
  const { endpoints }         = useNavigation();

  useEffect(() => {
    if (typeof endpoints[3] !== "undefined" && endpoints[3] !== folder) {
      setFolder(endpoints[3]);
      setEmails([]);
      setPage(1);
    }
  }, [endpoints]);

  useEffect(() => {
    setLoading(true);
    const params = {
      folder: folder,
      page: page,
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
          if(response.data.emails.length === 0) {
            setError(true);
            return;
          }
          if(response.data.emails.length === emails.length) {
            setError(true);
            return;
          }
          setEmails([...emails, ...response.data.emails]);
          setLoading(false);
        }
      });
    setLoading(false);
  }, [auth.token, page, folder]);

  return { emails, loading, error, setPage };
};
