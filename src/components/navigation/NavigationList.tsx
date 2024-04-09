import MailIcon from "../../assets/react-icons/MailIcon";
import { useNavigation } from "../../hooks/Navigation";
import { NavigationIconWrapper } from "./NavigationIconWrapper";

export const NavigationList = () => {
  const { navigateApp } = useNavigation();

  return (
    <div className="flex h-full">
      <NavigationIconWrapper title='Mail'  onClick={(e) => {e.preventDefault();navigateApp('mail','sdfsdf')}}>
        <MailIcon />
      </NavigationIconWrapper>
    </div>
  );
};
