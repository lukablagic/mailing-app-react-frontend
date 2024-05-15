import { useEffect, useState } from "react";
import { Mail } from "../../utility/models/Mail";
import { Avatar } from "../avatar/Avatar";
import { EmbededHTMLView } from "../embeded-html-view/EmbededHTMLView";
import ReplyIcon from "../../assets/react-icons/ReplyIcon";
import MoreDotsIcon from "../../assets/react-icons/MoreDotsIcons";
import { DateTimeUtility } from "../../utility/DateTimeUtlity";
import { useTabsContext } from "../../utility/contexts/TabsContext";

interface MailContentItemProps {
  mail: Mail;
  replyMail: (mail: Mail) => void;
  index: number;
}

export const MailContentItem = ({ mail, replyMail, index }: MailContentItemProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const { setCurrentIndex, tabsCounter } = useTabsContext();


  useEffect(() => {
    if (index === 0) {
      setCollapsed(false);
    }
  }, [index])

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const selectMail = () => {
    replyMail(mail);
  }

  return (
    <div className=" rounded-xl border border-gray-200 ">
      <div className="flex max-w-full flex-col ">
        <div
          className={`flex cursor-pointer flex-col border-b ${collapsed === true && "rounded-xl"}`}
          onClick={handleCollapse}
        >
          <div className="flex items-center justify-between p-4 px-6 ">
            <div className="flex flex-row gap-3 ">
              <Avatar name={mail.from_name} email={mail.from} />
              <div className="text-sm font-bold text-gray-700  tabel-cell flex align-baseline items-center">
                {mail.from_name === undefined || mail.from_name === null
                  ? mail.from
                  : mail.from_name}
              </div>
            </div>
            <div className="flex flex-row gap-3" onClick={(e) => { e.stopPropagation(); selectMail(); setCurrentIndex(`${mail.id}`) }}>
              <div className="cursor-pointer rounded-xl p-1 hover:bg-gray-200">
                <ReplyIcon />
              </div>
              <div className="cursor-pointer rounded-xl p-1 hover:bg-gray-200">
                <MoreDotsIcon />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 pt-0 px-6 ">
            <div className="text-sm text-center font-bold text-gray-600 ">{mail.from}</div>
            <div className="text-sm ">{DateTimeUtility.format(mail.sent_date, 'H:i d.m.Y')}</div>
          </div>
        </div>
        {collapsed === false && <EmbededHTMLView html={mail.body} />}
      </div>
    </div>
  );
};
