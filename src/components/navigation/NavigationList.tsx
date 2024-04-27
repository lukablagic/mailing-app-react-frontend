import { useNavigate } from "react-router-dom";
import MailIcon from "../../assets/react-icons/MailIcon";
import { useNavigation } from "../../hooks/Navigation";
import { NavigationIconWrapper } from "./NavigationIconWrapper";
import SettingsIcon from "../../assets/react-icons/SettingsIcon";

export const NavigationList = () => {
  const { navigateApp } = useNavigation();
 
  return (
    <div className="flex h-full flex-col gap-3 ">
      <NavigationIconWrapper title='Mail' selected={true}  onClick={(e) => {e.preventDefault();navigateApp('mail','inbox')}}>
        <MailIcon />
      </NavigationIconWrapper>
    </div>
  );
};
