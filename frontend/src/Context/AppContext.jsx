import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ This is the fix — add this line:
export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

 const getAuthState = async () => {
  try {
    const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
    console.log("is-auth response:", data);
    if (data.success) {
      setIsLoggedin(true);
      getUserData();  // async — doesn’t wait here
    }
  } catch (error) {
    console.error("Auth check failed:", error.message);
    toast.error(error.message);
  }
};

const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + "/api/user/data");
    console.log("user/data response:", data);
    if (data.success) {
      setUserData(data.userData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("User data fetch failed:", error.message);
    toast.error(error.message);
  }
};


  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
