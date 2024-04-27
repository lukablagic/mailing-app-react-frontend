import { Modal } from "../modal/Modal"
import { AddTeamMember } from "./AddTeamMember";
import { SettingsSidebar } from "./SettingsSidebar";

export const Settings = () => {

    let content;
    const location = window.location.hash;
    
    const options = [
        {
            location: '#settings/add-member',
            content: <AddTeamMember />
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
        <Modal title={'Setings'}>
            <div className="flex felx-row gap-0 min-h-[80vh] min-w-32">
                <SettingsSidebar />
                <div className="w-2/3">
                    {content}
                </div>
            </div>
        </Modal>
    )
}
