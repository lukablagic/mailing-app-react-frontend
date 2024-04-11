import { useEffect, useState } from "react";
import { Thread } from "../../utility/models/Thread";
import { getThreads } from "../../hooks/getThreads";
import { ThreadItem } from "../thread-item/ThreadItem";

export const MailSidebar = () => {
  const [displayedEmails, setDisplayedEmails] = useState<Thread[]>([]);
  const { emails, loading, error } = getThreads();

  useEffect(() => {
    if (emails.length > 0) {
      setDisplayedEmails(emails);
    }
  }, [emails]);

  return (
    <div className="flex w-1/3  shrink-0 flex-col gap-4 rounded-tl-lg bg-blue-950 p-4 text-white ">
      <div className="flex h-full w-full flex-col gap-2">
        <div className="mx-2  flex shrink flex-row items-center justify-between">
          <h1 className="mx-2 text-xl font-bold text-white">Folder name </h1>
        </div>
        <div className="ml-4 shrink grow basis-0 gap-4 overflow-auto text-gray-300">
          {typeof displayedEmails !== "undefined" &&
            displayedEmails.length > 0 &&
            displayedEmails.map((thread: Thread, index) => (
             <ThreadItem key={index} thread={thread} />
            ))}
        </div>
      </div>
    </div>
  );
};
