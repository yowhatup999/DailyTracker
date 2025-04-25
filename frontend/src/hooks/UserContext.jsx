import { createContext, useContext, useReducer } from "react";

// 1. Initialer Zustand
const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

// 2. Reducer-Funktion
function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload.user,
                token: action.payload.token,
                isLoggedIn: true,
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}

// 3. Context erstellen
const UserContext = createContext();

// 4. Provider-Komponente
export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

// 5. Einfacher Zugriff mit useUser()
export function useUser() {
    return useContext(UserContext);
}
