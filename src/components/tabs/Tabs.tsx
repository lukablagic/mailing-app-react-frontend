import React from 'react'
import TabsProvider, { useTabsContext } from '../../utility/contexts/TabsContext';
import './assets/styles.css';

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
    Titles: (props: TabTitlesProps) => React.ReactNode
    Contents: (props: TabContentProps) => React.ReactNode
}

type TabsProps = {
    children: React.ReactNode
}

type TabsWrapper = (props: TabsProps) => React.ReactNode

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
                    {title}
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

Tabs.Contents = ({ items }) => {
    const { currentIndex } = useTabsContext()

    return (
        <>
            {items.map((item, index) => {
                const { id, content } = item;
                return (
                    <div
                        className='tab-content'
                        key={id}
                        id={`tab-content-${id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-control-${id}`}
                        style={{ display: index === currentIndex ? 'block' : 'none' }}
                    >
                        {content}
                    </div>
                );
            })}
        </>
    );
}

export default Tabs