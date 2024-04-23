import { useContext } from "react";
import ActiveIcon from "./ActiveIcon";
import './assets/styles.css';
import { AuthContext } from "../../utility/contexts/AuthContext";
import { MeUser } from "./MeUser";
import { UserIcon } from "./UserIcon";

export const TeamMembers = () => {

  const { auth } = useContext(AuthContext);
console.log(auth.team.members)
  return (
    <div className="my-4  grid grid-rows-1">
      <div className=" flex flex-col items-center justify-center gap-4">
        <div className="vertical-center flex flex-col items-center  justify-center gap-4 text-center">
          <div className="add-user-icon">
            +
          </div>
          {auth.team.members.map((member, index) => (
            <UserIcon key={index} text={member.name[0] + member.surname[0]} isActive={true} />
          ))}
          <MeUser />
        </div>
      </div>
    </div>
  );
};
