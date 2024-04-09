import { useState, useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { Mail } from "../../components/mail/Mail";
import { TeamMembers } from "../../components/team-members/TeamMembers";
import { Search } from "../../components/Search";
import { NavigationList } from "../../components/navigation/NavigationList";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState(null);
  const [showAttachments, setShowAttachments] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="flex h-full bg-blue-900">
      <div className="flex w-16 mt-14 flex-col items-center justify-between bg-blue-900 text-purple-200">
        <NavigationList />
        <TeamMembers />
      </div>
      <div className="flex flex-grow flex-col ">
        <Search />
        <Mail />
      </div>
    </div>
  );
};

export default Home;
