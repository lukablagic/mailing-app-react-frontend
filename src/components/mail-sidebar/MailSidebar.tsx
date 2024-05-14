import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Thread } from "../../utility/models/Thread";
import { getThreads } from "../../hooks/getThreads";
import { MailFolders } from "../mails-folder/MailFolders";
import { useNavigation } from "../../hooks/Navigation";
import { ThreadContext } from "../../utility/contexts/ThreadContext";
import { ThreadItem } from "../thread-item/ThreadItem";
import { ReplyMail } from "../reply-mail/ReplyMail";
import { NewMail } from "../../utility/models/NewMail";
import { AuthContext } from "../../utility/contexts/AuthContext";
import MailIcon from "../../assets/react-icons/MailIcon";
import './assets/styles.css';

interface MailSidebarProprs {
    addTab: (tab:{id:number, title:string, content, collapsable: boolean}) => void;
    removeTab: (tabId: string) => void;
}

export const MailSidebar = ({addTab,removeTab}:MailSidebarProprs) => {

  const { setSelectedThread }                 = useContext(ThreadContext);
  const [displayedEmails, setDisplayedEmails] = useState<Thread[]>([]);
  const { emails, loading, setPage, error }   = getThreads();
  const { auth }                              = useContext(AuthContext);
  const { endpoints }                         = useNavigation();
  const counter                               = useRef(0);
  const observer                              = useRef<IntersectionObserver | null>(null);

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

  const handleAddNewMail = () => {
    counter.current++;
    const tabId = 'new-mail-' + counter.current;
    const mail  = new NewMail(auth.team.addresses[0],[],'',' ');
    addTab({id:counter.current, title: 'New Mail ' + counter, content: <ReplyMail replyMail={mail} tabId={tabId} removeTab={removeTab} renderFullView={false} replyType={"new"} />, collapsable: true})
  }

  return (
    <div className="flex w-1/3  shrink-0 flex-col gap-4 rounded-tl-lg bg-blue-950 p-4 text-white pb-0">
      <div className="flex h-full w-full flex-col gap-2">
        <div className="mx-2 flex shrink flex-row items-center justify-between">
          <MailFolders />
          <div>
            <button className="new-mail-button" onClick={handleAddNewMail}>
              New
              <MailIcon/>
            </button>
          </div>
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
