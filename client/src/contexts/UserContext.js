import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("email")
        if(loggedInUser){
            const body = JSON.stringify({email: loggedInUser})
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body
            };
            fetch(`/logIn`, options)
            .then(res => res.json())
            .then(data => {
                if(data.status === 200){setCurrentUser(data.data)}
            })
            .catch((error) => console.error(error))
        }
    },[])

    const logIn = (user) => {
        localStorage.setItem("email", user.email)
    }

    const logOut = () => {
        setCurrentUser(null)
        localStorage.removeItem("email")
    }

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, logIn, logOut}}>
            {children}
        </UserContext.Provider>
    );
};

// Export the context and provider
export default UserProvider;
