import { useEffect, useState } from "react";
import { MailContent } from "../mail-content/MailContent";
import { MailSidebar } from "../mail-sidebar/MailSidebar";
import Tabs from "../tabs/Tabs";
import { useTabsContext } from "../../utility/contexts/TabsContext";

export const Mail = () => {

  const [tabData, setTabData] = useState<any[]>([]);
  const { setCurrentIndex, tabsCounter, setTabsCounter } = useTabsContext();

  useEffect(() => {
    setTabData([{
      id: 'INDEX',
      title: 'INDEX',
      content: <MailContent addTab={handleAddTab} />
    }])
    setTabsCounter(0);
  }, [])
  const handleAddTab = (tab: { id, title,content }) => {
    setTabData(prevTabData => [...prevTabData, tab]);
    setCurrentIndex(tabsCounter + 1);
  }

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
