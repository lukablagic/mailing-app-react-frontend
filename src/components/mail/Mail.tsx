import { MailSidebar } from "./MailSidebar";
import Editor from "../editor/Editor";
import { Content } from "../content/Content";

export const Mail = () => {
  return (
    <div className="flex h-full flex-row overflow-hidden">
      <MailSidebar />
      <div className="h-full w-2/3 grow bg-white">
        <Content/>

        <div className="h-1/6 flex-grow bg-white relative">
          <Editor />
        </div>
      </div>
    </div>
  );
};
