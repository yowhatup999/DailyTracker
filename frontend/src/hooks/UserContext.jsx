import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
    isLoggedIn: true,
};

function userReducer(state, action) {
    switch (action.type) {
        case "LOGOUT":
            return { isLoggedIn: false };
        case "LOGIN":
            return { isLoggedIn: true };
        default:
            return state;
    }
}

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
