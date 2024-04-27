import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

type TabsContextProps = {
    currentIndex: number
    setCurrentIndex: Dispatch<SetStateAction<number>>,
    tabsCounter: number,
    setTabsCounter: Dispatch<SetStateAction<number>>,
}

type TabsProviderProps = {
    children: ReactNode
}

const initialContext: TabsContextProps = {
    currentIndex: 0,
    setCurrentIndex: () => { },
    tabsCounter: 0,
    setTabsCounter: () => { },
}

const TabsContext = createContext<TabsContextProps>(initialContext)

export default function TabsProvider({ children }: TabsProviderProps) {

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [tabsCounter, setTabsCounter]   = useState<number>(0)
  
    return (
        <TabsContext.Provider value={{ currentIndex, setCurrentIndex, tabsCounter, setTabsCounter }}>
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