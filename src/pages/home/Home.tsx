import { useState, useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { Mail } from "../../components/mail/Mail";
import { ActionSidebar } from "../../components/action-sidebar/ActionSidebar";
import { Search } from "../../components/Search";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState(null);
  const [showAttachments, setShowAttachments] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="flex bg-blue-900 h-full">
      <div className="flex w-16 flex-col items-center justify-end bg-blue-900 text-purple-200">
        <ActionSidebar />
      </div>
      <div className="flex flex-grow flex-col ">
        <Search />
        <Mail />
      </div>
    </div>
  );
};

export default Home;
