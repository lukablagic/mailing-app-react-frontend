const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useContext, useState } from "react"
import { AuthContext } from "../../utility/contexts/AuthContext"
import { UserIcon } from "../team-members/UserIcon";
import UserXIcon from "../../assets/react-icons/UserXIcon";
import axios from "axios";
import { ToastContext } from "../../utility/contexts/ToastContext";
import './assets/styles.css';
import { Tooltip } from "../tooltip/Tooltip";

export const AddTeamMember = () => {

  const { auth }                        = useContext(AuthContext);
  const [registerLink, setRegisterLink] = useState<string | null>(null);
  const { showMessage }                 = useContext(ToastContext);

  const handleGenerateNewMemberLink = () => {
    axios.post(BASE_URL + '/invitations/create-link'
      , {}
      , {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }).then((response) => {
        if (response.status === 200) {
          setRegisterLink(response.data.url)
        }

      }).catch((error) => {
        showMessage('error', 'An error occurred while generating the link');
        console.log(error)
      })
  }
  return (
    <>
      <h1 className="settings-content-title">Team members</h1>
      <div className="team-member">
        {auth?.team.members.map((member, index) => (
          <div key={index} className="team-member-item">
            <UserIcon key={index} text={member.name[0] + member.surname[0]} isActive={true} />
            <div className="team-member-item-info">
              <div className="flex flex-row gap-2">
                <h2>{member.name}</h2>
                <h2>{member.surname}</h2>
              </div>
              <p>{member.email}</p>
            </div>
            <div className="team-member-item-actions">
              <button>
                <UserXIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="user-link">
        <button className="plus-button" onClick={handleGenerateNewMemberLink}>Add</button>
      </div>
      {registerLink && (
        <div className="register-link-container">
          <h1 className="settings-content-title">Registration link</h1>
          <Tooltip text={"Click to save to clipboard!"}>
            <p className="register-link">
              {registerLink}
            </p>
          </Tooltip>
          <p className="register-help-text">
            Share this link with your team members so they can join your team.
          </p>
        </div>
      )}
    </>
  )
}
