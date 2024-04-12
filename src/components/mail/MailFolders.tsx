import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ArrorDown from "../../assets/react-icons/ArrowDown";
import { AuthContext } from "../../utility/contexts/AuthContext";

interface Folder {
    id: number;
    name: string;
}

interface FoldersResponse {
    folders: Folder[];
}

export const MailFolders = () => {

    const [selectedFolder, setSelectedFolder] = useState({name: "Inbox",id: 1,});
    const [folders, setFolders] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        axios.get<FoldersResponse>("http://localhost/api/folders/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        
        }).then((response) => {
        if (response.status === 200) {
            setFolders(response.data.folders);
        }});
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <h1 className="mx-2 text-xl flex flex-row gap-2 items-center font-bold text-white cursor-pointer" onClick={toggleDropdown}>
                {selectedFolder.name} <ArrorDown/>
            </h1>
            {dropdownOpen === true && (
                <div className="absolute bg-blue-950 text-white w-48">
                    {folders.map((folder: Folder) => (
                        <div
                            key={folder.id}
                            className="p-2 hover:bg-gray-500 hover:text-white" 
                            onClick={() => {
                                setSelectedFolder(folder);
                                setDropdownOpen(false);
                            }}
                        >
                            {folder.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
