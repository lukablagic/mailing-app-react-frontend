import { useState, useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { Mail } from "../../components/Mail";
import { Sidebar } from "../../components/Sidebar";
import { ActionSidebar } from "../../components/action-sidebar/ActionSidebar";
import { Search } from "../../components/Search";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState(null);
  const [showAttachments, setShowAttachments] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="flex h-screen">
      <div className="flex w-16 flex-col items-center justify-end bg-blue-950 text-purple-200">
        <ActionSidebar />
      </div>
      <div className="flex flex-grow flex-col">
        <div className="flex items-center justify-between bg-blue-950 text-white">
          <Search />
        </div>
        <div className="flex grow flex-row overflow-auto  ">
          <Sidebar />
          <Mail />
        </div>
      </div>
    </div>
  );
};

export default Home;
