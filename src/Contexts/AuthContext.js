import React, {useState, useEffect, useContext, AuthService,createContext} from "react";

export const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider(props){
	const [authUser,setAuthUser] = useState(null)
	const [token,setToken] = useState('')
	const [isLoggedIn,setIsLoggedIn] = useState(false)

  
  useEffect(() => {
    // Update the token state variable when the token in local storage changes
    
      const session = localStorage.getItem('token')
      if(session){
        setIsLoggedIn(true);
		    setToken(session);
      }else{
        setIsLoggedIn(false);
        // setToken('');
      }

    
  }, []);


	const login = (newToken, newUserInfo) => {
		setIsLoggedIn(true);
    setToken(newToken);
    setAuthUser(newUserInfo);
  };

  const logout = () => {
  	setIsLoggedIn(false);
    setToken('');
    setAuthUser(null);
  };


	return(
		<AuthContext.Provider value={{authUser,isLoggedIn,token,login,logout}}>{props.children}</AuthContext.Provider>
	)

}
