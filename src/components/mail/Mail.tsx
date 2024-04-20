import { MailContent } from "../mail-content/MailContent";
import { MailSidebar } from "../mail-sidebar/MailSidebar";
import Tabs from "../tabs/Tabs";

export const Mail = () => {

  const tabData = [
    {
      id: 'INDEX',
      title: 'INDEX',
      content: <MailContent />
    },
  ]

  return (
    <div className="flex h-full flex-row overflow-hidden">
      <MailSidebar />
      <Tabs>
        <Tabs.Titles items={tabData.map(({ id, title }) => ({ id, title }))} />
        <Tabs.Contents
          items={tabData.map(({ id, content }) => ({
            id,
            content: <div className='tab-content'>{content}</div>,
          }))}
        />
      </Tabs>
    </div>
  );
};
