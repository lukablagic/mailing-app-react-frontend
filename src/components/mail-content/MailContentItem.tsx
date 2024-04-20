import { useState } from "react";
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
}

export const MailContentItem = ({ mail, replyMail }: MailContentItemProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const { setCurrentIndex, tabsCounter } = useTabsContext();

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
              <h1 className="text-xl font-bold">
                {mail.from_name === undefined || mail.from_name === null
                  ? mail.from
                  : mail.from_name}
              </h1>
            </div>
            <div className="flex flex-row gap-3" onClick={(e) => { e.stopPropagation(); selectMail(); setCurrentIndex(tabsCounter + 1) }}>
              <div className="cursor-pointer rounded-xl p-1 hover:bg-gray-200">
                <ReplyIcon />
              </div>
              <div className="cursor-pointer rounded-xl p-1 hover:bg-gray-200">
                <MoreDotsIcon />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 pt-0 px-6 ">
            <p className="text-gray-600">{mail.from}</p>
            <div>{DateTimeUtility.format(mail.sent_date, 'H:i d.m.Y')}</div>
          </div>
        </div>
        {collapsed === false && <EmbededHTMLView html={mail.body} />}
      </div>
    </div>
  );
};
