import ActiveIcon from "./ActiveIcon";
import './assets/styles.css';

export const UserIcon = ({ text, isActive }) => {
    return (
        <div>
            <ActiveIcon key={'me-user'} isActive={isActive} position={"right"}>
                <div className="sidebar-user-icon">
                    {text}
                </div>
            </ActiveIcon>
        </div>
    )
}
