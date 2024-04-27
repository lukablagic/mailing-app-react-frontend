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
            <div className="">

            <SettingsSidebar />
            </div>
            {content}
        </Modal>
    )
}
