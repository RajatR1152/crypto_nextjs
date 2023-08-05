'use client'

import { createContext, useState } from "react"

export const LoginContext = createContext();

export default function LoginProvider({ children }) {

    const [isLogedIn, setIsLogedIn] = useState(true);

    return (
        <LoginContext.Provider value={{ isLogedIn, setIsLogedIn }}>
            {children}
        </LoginContext.Provider>
    )
}
