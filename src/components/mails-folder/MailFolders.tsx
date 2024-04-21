import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ArrorDown from "../../assets/react-icons/ArrowDown";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { useNavigation } from "../../hooks/Navigation";

interface Folder {
  id: number;
  name: string;
}

interface FoldersResponse {
  folders: Folder[];
}

export const MailFolders = () => {
  
  const [selectedFolder, setSelectedFolder] = useState({name: "Inbox",id: 1,});
  const [folders, setFolders]               = useState([]);
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const { auth }                            = useContext(AuthContext);
  const { navigateApp }                     = useNavigation();

  useEffect(() => {
    axios
      .get<FoldersResponse>("http://localhost/api/folders/all", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFolders(response.data.folders);
        }
      });
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
    navigateApp("mail", folder.name.toLowerCase());
  };

  return (
    <div>
      <h1
        className="mx-2 flex cursor-pointer flex-row items-center gap-2 text-xl font-bold text-white"
        onClick={toggleDropdown}
      >
        {selectedFolder.name} <ArrorDown />
      </h1>
      {dropdownOpen === true && (
        <div className="absolute w-48 bg-blue-950 text-white rounded-lg border border-white">
          {folders.map((folder: Folder) => (
            <div
              key={folder.id}
              className="p-2 text-white hover:bg-gray-500 first:rounded-t-lg cursor-pointer last:rounded-b-lg"
              onClick={() => {
                handleSelectFolder(folder);
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
