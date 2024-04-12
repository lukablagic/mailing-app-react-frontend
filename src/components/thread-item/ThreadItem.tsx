import MailIcon from "../../assets/react-icons/MailIcon";
import OpenLetter from "../../assets/react-icons/OpenLetter";
import { Thread } from "../../utility/models/Thread";
import { DateTimeUtility } from "../../utility/DateTimeUtlity";

interface ThreadProps {
  thread: Thread;
}

export const ThreadItem = ({ thread }: ThreadProps) => {
  return (
    <div className="p-2 px-3 mx-2 cursor-pointer rounded-md text-gray-300 hover:bg-gray-500   hover:text-white  ">
      <div className="flex flex-row items-center ">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-start gap-2  ">
              {thread.is_read === 1 ? <MailIcon className="text-gray-500 fill-white p-0 m-0" height={20} width={20}/> : <OpenLetter className="text-gray-500 fill-blue-950  hover:fill-blue-200  p-0 m-0" height={18} width={18}/>}
            <div className="text-normal font-bold ">
              {thread.from_name === undefined || thread.from_name === null ? thread.from : thread.from_name}
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-2 ">
          <div className=" self-start truncate m-0 p-0">{thread.subject}</div>
            <div className=" self-start  m-0 p-0 ">
              {DateTimeUtility.format(thread.sent_date,'H:i')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
