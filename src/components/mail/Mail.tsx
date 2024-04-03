import React from "react";
import { MailSidebar } from "./MailSidebar";

export const Mail = () => {
  return (
    <div className="flex h-full flex-row overflow-hidden">
      <MailSidebar />
      <div className="h-full grow w-2/3 bg-white">
        Main content
      </div>
    </div>
  );
};
