import { createContext, useState } from 'react';
import { Thread } from '../models/Thread';


 const ThreadContext = createContext({
    selectedThread   : null,
    setSelectedThread: (thread: Thread) => {},
  });

function ThreadProvider ({ children }) {

    const [selectedThread, setSelectedThread] = useState(null);
  
    return (
      <ThreadContext.Provider value={{ selectedThread, setSelectedThread }}>
        {children}      
      </ThreadContext.Provider>
    );
}  

export { ThreadContext, ThreadProvider };
