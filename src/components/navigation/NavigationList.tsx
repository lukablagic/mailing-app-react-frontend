import MailIcon from "../../assets/react-icons/MailIcon";
import { NavigationIconWrapper } from "./NavigationIconWrapper";

export const NavigationList = () => {
  return (
    <div className="flex h-full">
      <NavigationIconWrapper title='Mail'>
        <MailIcon />
      </NavigationIconWrapper>
    </div>
  );
};
