import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type viewType = "mail" | "message" | "activity";

export const useNavigation = () => {
  const location = useLocation();
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLocation();
  }, [location]);

  const getLocation = () => {
    const parsedUrl = location.pathname.split("/");

    setEndpoints(parsedUrl);
  };

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

  return { navigateApp, location, endpoints };
};
