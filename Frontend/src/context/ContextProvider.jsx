import {createContext, useContext, useState} from "react";
import Cookies from "universal-cookie";






const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setAdminToken:() =>{}
})


export const ContextProvider = ({children}) => {
  

  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [adminToken, _setAdminToken] = useState(localStorage.getItem('ADMIN_TOKEN'));


  console.log('admin-cookies',adminToken)


    const setAdminToken = (token) => {
      _setAdminToken(token);
      if (token) {
        localStorage.setItem("ADMIN_TOKEN", token);
      } else {
        localStorage.removeItem("ADMIN_TOKEN");
      }
    };


  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }




  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      adminToken,
      setAdminToken
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);