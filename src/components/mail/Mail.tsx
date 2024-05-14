import { useEffect, useState } from "react";
import { MailContent } from "../mail-content/MailContent";
import { MailSidebar } from "../mail-sidebar/MailSidebar";
import Tabs from "../tabs/Tabs";
import { useTabsContext } from "../../utility/contexts/TabsContext";
import { TabItem } from "../../utility/models/TabItem";

export const Mail = () => {

  const [tabData, setTabData]                            = useState<TabItem[]>([]);
  const { setCurrentIndex, tabsCounter, setTabsCounter } = useTabsContext();

  useEffect(() => {
    setTabData([{
      id: 'INDEX',
      title: 'INDEX',
      content: <MailContent addTab={handleAddTab} removeTab={handleRemoveTab} />,
      collapsable: false
    }])
    setTabsCounter(0);
  }, [])

  const handleAddTab = (tab: { id, title, content, collapsable }) => {
    console.log(tab)
    setTabData(prevTabData => [...prevTabData, tab]);
    setCurrentIndex(tabsCounter + 1);
  }
  const handleRemoveTab = (tabId: string) => {
    setTabData(prevTabData => prevTabData.filter(tab => tab.id !== tabId));
  }

  return (
    <div className="flex h-full flex-row overflow-hidden">
      <MailSidebar addTab={handleAddTab} removeTab={handleRemoveTab}/>
      <Tabs>
        <Tabs.Titles items={tabData} removeTab={handleRemoveTab} />
        <Tabs.Contents
          items={tabData.map(({ id, content, collapsable }) => ({
            id,
            content: <>{content}</>,
          }))}
        />
      </Tabs>
    </div>
  );
};
