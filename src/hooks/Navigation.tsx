import { useLocation, useNavigate } from "react-router-dom";

type viewType = "mail" | "message" | "activity";

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateApp = (viewType: viewType, location: string) => {
    let path = "/app/";

    if (viewType) {
      path += `${viewType}/`;
    }

    if (location !== null) {
        path += `${location}`;
    }

    navigate(path);
  };

  return { navigateApp, location };
};
