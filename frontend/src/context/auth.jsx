import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios
  // it is done so when user by mistake cancels the page then also he remains login in the page as token is saved
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    // as when page rerender all the info lost but use effect stores all the info
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hooks
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
