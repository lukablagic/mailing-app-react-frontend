import { useContext } from "react";
import { AuthContext } from "../../utility/contexts/AuthContext";
import ActiveIcon from "./ActiveIcon";
import { UserIcon } from "./UserIcon";

export const MeUser = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div>
            <UserIcon text={auth.user.name[0] + auth.user.surname[0]} isActive={true} />
        </div>
    )
}
