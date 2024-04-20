import { useContext, useEffect, useState } from "react";
import { ThreadContext } from "../../utility/contexts/ThreadContext";
import { Thread } from "../../utility/models/Thread";
import { AuthContext } from "../../utility/contexts/AuthContext";
import axios from "axios";
import { Mail } from "../../utility/models/Mail";
import { MailContentItem } from "./MailContentItem";
import { MailEditor } from "../editor/MailEditor";
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
      .get<ThreadMembersResponse>(`${BASE_URL}/threads/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      })
      .then((response) => {
        console.log(response);
        if (response.data.ok === true) {
          setDisplayedEmails(response.data.emails);
        }
      });
  }, [selectedThread, token]);

  return (
    <>
      <div className="flex h-5/6 w-full grow flex-col gap-2  overflow-y-auto overflow-x-hidden ">
        {typeof selectedThread !== "undefined" && selectedThread !== null && (
          <div className="w-full border-b border-t p-4">
            <h2 className="text-xl font-semibold">{selectedThread.subject}</h2>
          </div>
        )}
        <div className=" m-5 mt-3 flex flex-col gap-5">
          {typeof displayedEmails !== "undefined" &&
            displayedEmails.map((mail: Mail) => (
              <MailContentItem mail={mail} key={mail.id} />
            ))}
        </div>
      </div>
      <div className="relative h-1/6 max-h-64 flex-grow bg-white m-4">
        <MailEditor html={"laoo "} />
      </div>
    </>
  );
};
