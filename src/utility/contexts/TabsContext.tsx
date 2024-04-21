import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

type TabsContextProps = {
    currentIndex: number
    setCurrentIndex: Dispatch<SetStateAction<number>>,
    tabsCounter: number,
    setTabsCounter: Dispatch<SetStateAction<number>>,
    tabs: TabItem[],
    handleAddTab: (tab: { id, title, content, collapsable }) => void
}

type TabsProviderProps = {
    children: ReactNode
}

const initialContext: TabsContextProps = {
    currentIndex: 0,
    setCurrentIndex: () => { },
    tabsCounter: 0,
    setTabsCounter: () => { },
    tabs: [],
    handleAddTab: () => { }
}

const TabsContext = createContext<TabsContextProps>(initialContext)

export default function TabsProvider({ children }: TabsProviderProps) {

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [tabsCounter, setTabsCounter]   = useState<number>(0)
    const [tabs, setTabs]                 = useState<TabItem[]>([])

    const handleAddTab = (tab: { id, title, content, collapsable }) => {
        setTabs(prevTabs => [...prevTabs, JSON.parse(JSON.stringify(tab))]);
        setCurrentIndex(tabsCounter + 1);
    }

    return (
        <TabsContext.Provider value={{ currentIndex, setCurrentIndex, tabsCounter, setTabsCounter, tabs, handleAddTab }}>
            {children}
        </TabsContext.Provider>
    )
}

export function useTabsContext(): TabsContextProps {
    const context = useContext(TabsContext)
    if (context === undefined) {
        throw new Error('useTabs must be used within a TabsProvider')
    }
    return context
}