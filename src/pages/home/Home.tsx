import { useState, useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { Mail } from "../../components/mail/Mail";
import { TeamMembers } from "../../components/team-members/TeamMembers";
import { Search } from "../../components/Search";
import { NavigationList } from "../../components/navigation/NavigationList";
import { Routes, Route } from "react-router-dom";
import { Overview } from "../../components/overview/Overview";

const Home = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="flex h-full bg-blue-900">
      <div className="mt-14 flex w-16 flex-col items-center justify-between bg-blue-900 text-purple-200">
        <NavigationList />
        <TeamMembers />
      </div>
      <div className="flex flex-grow flex-col ">
        <Search />
        <Routes>
          <Route path="mail/*" element={<Mail />} />
          <Route path="/" element={<Overview />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
