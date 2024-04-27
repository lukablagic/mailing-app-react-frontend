import { useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { UserIcon } from "./UserIcon";
import { useNavigate } from "react-router-dom";

export const MeUser = () => {
    
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const openSettings = () => {
        navigate('#settings');
    }

    return (
        <div onClick={openSettings}>
            <UserIcon text={auth.user.name[0] + auth.user.surname[0]} isActive={true} />
        </div>
    )
}
