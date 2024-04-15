import { MailEditor } from "../editor/MailEditor";
import { MailContent } from "../mail-content/MailContent";
import { MailSidebar } from "../mail-sidebar/MailSidebar";

export const Mail = () => {
  return (
    <div className="flex h-full flex-row overflow-hidden">
      <MailSidebar />
      <div className="h-full w-2/3 grow bg-white overflow-auto">
        <MailContent />
      </div>
    </div>
  );
};
