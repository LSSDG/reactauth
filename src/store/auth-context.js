import React ,{useState} from 'react';
const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login: (token)=>{},
    logout:()=>{} 
});
export const AuthContextProvider = props =>{
    const initialState = localStorage.getItem('token');
    const [token,setToken] = useState(initialState);
    const userIsLoggedIn = !!token;

    const loginHandler = token =>{
        setToken(token);
        localStorage.setItem('token',token);
        setTimeout(()=>{
            localStorage.removeItem('token',token);
        },300000)
    }
    const logoutHandler =  () =>{
        setToken(null);
        localStorage.removeItem('token',token);
    }
    const contextValue={
        token: token,
        isLoggedIn:userIsLoggedIn,
        login:  loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
 


