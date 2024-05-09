import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Thread } from "../../utility/models/Thread";
import { getThreads } from "../../hooks/getThreads";
import { MailFolders } from "../mails-folder/MailFolders";
import { useNavigation } from "../../hooks/Navigation";
import { ThreadContext } from "../../utility/contexts/ThreadContext";
import { ThreadItem } from "../thread-item/ThreadItem";
import './assets/styles.css';

export const MailSidebar = () => {

  const { setSelectedThread } = useContext(ThreadContext);
  const [displayedEmails, setDisplayedEmails] = useState<Thread[]>([]);
  const { emails, loading, setPage, error } = getThreads();
  const { endpoints } = useNavigation();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastEmailElementRef = useCallback(node => {
    if (loading || error) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    if (loading === false) {
      setDisplayedEmails(emails);
    }
  }, [emails, endpoints]);

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
  };

  return (
    <div className="flex w-1/3  shrink-0 flex-col gap-4 rounded-tl-lg bg-blue-950 p-4 text-white pb-0">
      <div className="flex h-full w-full flex-col gap-2">
        <div className="mx-2 flex shrink flex-row items-center justify-between">
          <MailFolders />
        </div>
        <div className="thread-list">
          {typeof displayedEmails !== "undefined" &&
            displayedEmails.length > 0 &&
            displayedEmails.map((thread: Thread, index) => {
              if (displayedEmails.length === index + 1) {
                return <ThreadItem ref={lastEmailElementRef} key={index} thread={thread} onSelect={handleSelectThread} />
              } else {
                return <ThreadItem key={index} thread={thread} onSelect={handleSelectThread} />
              }
            })}
        </div>
        {loading && <div className="relative text-center text-white">Loading...</div>}
      </div>
    </div>
  );
};
