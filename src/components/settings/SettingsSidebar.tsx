import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

export const SettingsSidebar = () => {
    
    const navigate = useNavigate();

    const navigateSetttings = (location: string) => {
        navigate(location);
    }

    return (
        <div className='settings-sidebar'>
            <div className={`settings-sidebar-item ${window.location.href === '#settings/add-team-member' && 'selected'}`} onClick={()=>navigateSetttings(window.location.pathname + '#settings/add-member')}>
                Add Team Member
            </div>
        </div>
    )
}
