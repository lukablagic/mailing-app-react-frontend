import { useContext } from "react";
import ActiveIcon from "./ActiveIcon";
import './assets/styles.css';
import { AuthContext } from "../../utility/contexts/AuthContext";
import { MeUser } from "./MeUser";
import { UserIcon } from "./UserIcon";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "../../assets/react-icons/SettingsIcon";
import { NavigationIconWrapper } from "../navigation/NavigationIconWrapper";
import { Tooltip } from "../tooltip/Tooltip";

export const TeamMembers = () => {

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="my-4  grid grid-rows-1">
      <div className=" flex flex-col items-center justify-center gap-4">
        <div className="vertical-center flex flex-col items-center  justify-center gap-4 text-center">
          <div className="add-user-icon" onClick={()=> {navigate('#settings/add-member')}}>
            +
          </div>
          {auth.team.members.map((member, index) => (
            <Tooltip text={member.name + ' ' + member.surname}>
              <UserIcon key={index} text={member.name[0] + member.surname[0]} isActive={true} />
            </Tooltip>
          ))}
          <Tooltip text={'Me'}>
            <MeUser />
          </Tooltip>
          <NavigationIconWrapper title='Settings' selected={true} onClick={(e) => { e.preventDefault(); navigate('#settings') }}>
            <SettingsIcon />
          </NavigationIconWrapper>
        </div>
      </div>
    </div>
  );
};
