import { useContext, useEffect, useState } from "react";
import { ThreadContext } from "../../utility/contexts/ThreadContext";
import { Thread } from "../../utility/models/Thread";
import { AuthContext } from "../../utility/contexts/AuthContext";
import axios from "axios";
import { Mail } from "../../utility/models/Mail";
import { MailContentItem } from "./MailContentItem";
import { ReplyMail } from "../reply-mail/ReplyMail";
import { useTabsContext } from "../../utility/contexts/TabsContext";
import { MailEditor } from "../editor/MailEditor";
import { TabItem } from "../../utility/models/TabItem";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ThreadMembersResponse {
  ok    : boolean;
  emails: Thread[];
}
interface MailContentProps {
  addTab   ?: (tab: TabItem) => void;
  removeTab?: (tabId: string) => void;
}

export const MailContent = ({ addTab, removeTab }: MailContentProps) => {

  const { selectedThread }                    = useContext(ThreadContext);
  const { setCurrentIndex }                   = useTabsContext();
  const { auth }                              = useContext(AuthContext);
  const [displayedEmails, setDisplayedEmails] = useState<Thread[]>([]);
  const [message, setMessage]                 = useState<string>(' ');

  const handleUpdateMessage = (data: string) => {
    setMessage(data);
  };
  useEffect(() => {
    if (selectedThread === null) return;
    const params = {
      id: selectedThread.id,
    };
    axios
      .get<ThreadMembersResponse>(`${BASE_URL}/threads/members`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: params,
      })
      .then((response) => {
        if (response.data.ok === true) {
          setDisplayedEmails(response.data.emails);
          setCurrentIndex('INDEX');
        }
      });

      return () => {
        setDisplayedEmails([]);
      }
  }, [selectedThread, auth.token]);


  const handleReplyMail = (mail: Mail) => {
    addTab(
      {
        id: `${mail.id}`,
        title: mail.from_name !== null ? mail.from_name : mail.from,
        content: <ReplyMail replyMail={mail} renderFullView={true} removeTab={removeTab} tabId={`${mail.id}`} replyType={"reply"} />,
        collapsable: true,
      },
    );
  }
console.log(selectedThread)
  return (
    <div className="flex flex-col w-full overflow-auto">
      <div className="flex max-h-[88%]  w-full grow flex-col overflow-y-auto overflow-x-hidden">
        {typeof selectedThread !== "undefined" && selectedThread !== null && (
          <div className="w-full border-b border-t p-2 px-4 text-gray-700">
            <h2 className="text-lg font-semibold">{selectedThread.subject}</h2>
          </div>
        )}
        <div className="m-5 mt-3 flex flex-col gap-5">
          {typeof displayedEmails !== "undefined" &&
            displayedEmails.map((mail: Mail, index: number) => (
              <MailContentItem mail={mail} key={mail.id} replyMail={handleReplyMail} index={index} />
            ))}
        </div>
      </div>
      <div className="relative h-32 bg-white px-4 pt-0 max-h-32">
        {typeof message !== "undefined" && message !== null &&
          <MailEditor html={message} saveData={handleUpdateMessage} placholder="Send message to your team..." />
        }
      </div>
    </div>
  );
};
