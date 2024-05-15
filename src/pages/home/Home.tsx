import { Mail } from "../../components/mail/Mail";
import { TeamMembers } from "../../components/team-members/TeamMembers";
import { Search } from "../../components/Search";
import { NavigationList } from "../../components/navigation/NavigationList";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Overview } from "../../components/overview/Overview";
import './assets/styles.css';
import { useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { Settings } from "../../components/settings/Settings";

const Home = () => {

  const { isAuthenticated } = useContext(AuthContext);
  const location            = useLocation();
  
  return (
    <div className="flex h-full bg-blue-900">
      <div className="left-thin-sidebar">
        <NavigationList />
        <TeamMembers />
      </div>
      <div className="flex flex-grow flex-col ">
        <Search />
        <Routes>
          <Route path="mail/*" element={<Mail />} />
          <Route path="/" element={<Overview />} />
          <Route path="*" element={isAuthenticated === false && <Navigate to="/mail/inbox" replace />} />
        </Routes>
        {location.hash.startsWith("#settings") && <Settings />}
      </div>
    </div>
  );
};

export default Home;
