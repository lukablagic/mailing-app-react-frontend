import { AccountSettings } from "./account-settings/AccountSettings";
import { Modal } from "../modal/Modal"
import { AddTeamMember } from "./AddTeamMember";
import { SettingsSidebar } from "./SettingsSidebar";

export const Settings = () => {

    let content;
    const location = window.location.hash;
    
    const options = [
        {
            location: '#settings/team-members',
            content: <AddTeamMember />
        },
        {
            location: '#settings/account',
            content: <AccountSettings/>
        },
        {
            location: '#settings',
            content: "Select an option"
        },
    ];

    options.forEach(element => {
        if (location === element.location) {
            content = element.content;
        }
    });

    return (
        <Modal title={'Settings'}>
            <div className="flex felx-row gap-0 min-h-[80vh] min-w-96">
                <SettingsSidebar />
                <div className="settings-content">
                    {content}
                </div>
            </div>
        </Modal>
    )
}
