import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

export const SettingsSidebar = () => {

    const navigate = useNavigate();

    const navigateSetttings = (location: string) => {
        navigate(location);
    }

    return (
        <div className='settings-sidbebar'>
            <div className={`settings-sidebar-item ${window.location.hash === '#settings/account' ? 'selected' : ""}`} onClick={() => navigateSetttings(window.location.pathname + '#settings/account')}>
                Account
            </div>
            <div className={`settings-sidebar-item ${window.location.hash === '#settings/team-members' ? 'selected' : ""}`} onClick={() => navigateSetttings(window.location.pathname + '#settings/team-members')}>
                Team memebers
            </div>
        </div>
    )
}
