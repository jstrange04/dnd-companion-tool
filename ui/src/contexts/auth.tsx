import { createContext } from "react";

interface AuthContextProps {
    state: {
        accessToken: string;
        refreshToken: string;
    }
    dispatch: React.Dispatch<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthProvider() {
    
}