import { useState } from "react";
import { Mail } from "../../utility/models/Mail";
import { Avatar } from "../avatar/Avatar";
import { EmbededHTMLView } from "../embeded-html-view/EmbededHTMLView";

interface MailContentItemProps {
  mail: Mail;
}

export const MailContentItem = ({ mail }: MailContentItemProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className=" rounded-xl border border-gray-200 ">
      <div className="flex flex-col max-w-full ">
        <div
          className={`flex cursor-pointer flex-col gap-2 border-b ${collapsed === true && "rounded-xl" }`}
          onClick={handleCollapse}
        >
          <div className="flex flex-row gap-3 p-4 pb-0 ">
            <Avatar name={mail.from_name} email={mail.from} />
            <h1 className="text-xl font-bold">
              {mail.from_name === undefined || mail.from_name === null
                ? mail.from
                : mail.from_name}
            </h1>
          </div>
          <p className="px-4 pb-3 text-gray-600">{mail.from}</p>
        </div>
        {collapsed === false && <EmbededHTMLView html={mail.body} />}
      </div>
    </div>
  );
};
