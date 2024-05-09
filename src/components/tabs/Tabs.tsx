import React from 'react'
import TabsProvider, { useTabsContext } from '../../utility/contexts/TabsContext';
import './assets/styles.css';
import { TabItem } from '../../utility/models/TabItem';

type TabTitlesProps = {
    items: TabItem[],
    removeTab: (tabId: string) => void
}

type TabContentProps = {
    items: {
        id: string
        title?: string
        content?: React.ReactNode
        collapsable?: boolean
    }[]
}

type TabsComposition = {
    Titles  : (props: TabTitlesProps) => React.ReactElement | null
    Contents: (props: TabContentProps) => React.ReactElement | null
}

type TabsProps = {
    children: React.ReactNode
}

type TabsWrapper = (props: TabsProps) => React.ReactElement | null

const Tabs: TabsWrapper & TabsComposition = ({ children }) => {
    return <div className='tabs-wrapper'><TabsProvider>{children}</TabsProvider></div>
}

Tabs.Titles = ({ items, removeTab }: TabTitlesProps) => {

    const { currentIndex, setCurrentIndex } = useTabsContext()

    return (
        <div role="tab-list" className='tab-list' >
            {items.map(({ id, title, collapsable }, index) => (
                <div
                    className={`tab-list-item ${currentIndex === index ? 'selected-tab-item' : ''}`}
                    key={id}
                    id={`tab-control-${id}`}
                    role="tab"
                    aria-controls={`tab-content-${id}`}
                    aria-selected={currentIndex === index}
                    onClick={() => {
                        setCurrentIndex(index)
                    }}
                >
                    <div className='tab-list-text'>
                        {title}
                    </div>
                    {collapsable === true &&
                        <div className='tabs-close-icon' onClick={(e) => { removeTab(id) }}>
                            X
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

Tabs.Contents = ({items}) => {

    const { currentIndex } = useTabsContext()

    return (
        <>
            {items.map((item, index) => {
                const { id, content } = item;
                return (
                    <div
                        key={id}
                        id={`tab-content-${id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-control-${id}`}
                        className={index === currentIndex ? 'flex flex-1 h-[96%]' : 'hidden'}
                    >
                        <div className='tab-content'>
                            {content}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Tabs