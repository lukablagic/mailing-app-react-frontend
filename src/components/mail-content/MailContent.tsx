import { useContext, useEffect, useState } from "react";
import { ThreadContext } from "../../utility/contexts/ThreadContext";
import { Thread } from "../../utility/models/Thread";
import { AuthContext } from "../../utility/contexts/AuthContext";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


interface ThreadMembersResponse {
  ok: boolean;
  emails: Thread[];
}

export const MailContent = () => {
  const { selectedThread } = useContext(ThreadContext);
  const { token } = useContext(AuthContext);
  const [displayedEmails, setDisplayedEmails] = useState<Thread[]>([]);

  useEffect(() => {
    if (selectedThread === null) return;

    const params = {
      id: selectedThread.id,
    };
    axios
      .get<ThreadMembersResponse>(
        `${BASE_URL}/threads/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        },
      )
      .then((response) => {
        console.log(response)
        if (response.data.ok === true) {
          setDisplayedEmails(response.data.emails);
        }
      });
  }, [selectedThread, token]);

  return (
    <div className="flex h-5/6 w-full grow overflow-y-auto overflow-x-hidden"></div>
  );
};
