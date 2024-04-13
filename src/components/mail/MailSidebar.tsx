import { useContext, useEffect, useState } from "react";
import { Thread } from "../../utility/models/Thread";
import { getThreads } from "../../hooks/getThreads";
import { ThreadItem } from "../thread-item/ThreadItem";
import { MailFolders } from "./MailFolders";
import { useNavigation } from "../../hooks/Navigation";
import { ThreadContext } from "../../utility/contexts/ThreadContext";

export const MailSidebar = () => {

  const {setSelectedThread} = useContext(ThreadContext);
  const [displayedEmails, setDisplayedEmails] = useState<Thread[]>([]);
  const { emails, loading, error } = getThreads();
  const {endpoints} = useNavigation();
  
  useEffect(() => {
    if (loading === false) {
      setDisplayedEmails(emails);
    }
  }, [emails,endpoints]);

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
  };

  return (
    <div className="flex w-1/3  shrink-0 flex-col gap-4 rounded-tl-lg bg-blue-950 p-4 text-white ">
      <div className="flex h-full w-full flex-col gap-2">
        <div className="mx-2  flex shrink flex-row items-center justify-between">
         <MailFolders/>
        </div>
        <div className="ml-4 shrink grow basis-0 gap-4 overflow-auto text-gray-300">
          {typeof displayedEmails !== "undefined" &&
            displayedEmails.length > 0 &&
            displayedEmails.map((thread: Thread, index) => (
             <ThreadItem key={index} thread={thread} onSelect={handleSelectThread}/>
            ))}
        </div>
      </div>
    </div>
  );
};
