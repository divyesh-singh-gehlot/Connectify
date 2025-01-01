import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../../conf/conf2";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {}
        setLoading(false);
    };
    
    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        console.log("CREDS:", credentials);

        try {
            let response = await account.createEmailPasswordSession(credentials.email,credentials.password);
            console.log('Logged in', response)
            let accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    };

    const handleUserLogout = async () =>{
        const response = await account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
        console.log("Handle Register triggered!", credentials);
    
        if (credentials.password1 !== credentials.password2) {
            alert("Passwords did not match!");
            return;
        }
    
        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            );
            console.log("User registered successfully!", response);
    
            let sessionResponse = await account.createEmailPasswordSession(credentials.email, credentials.password1);
            console.log("User logged in after registration!", sessionResponse);
    
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate('/');
        } catch (error) {
            console.error("Registration failed!", error);
        }
    };
    

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleRegister
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
