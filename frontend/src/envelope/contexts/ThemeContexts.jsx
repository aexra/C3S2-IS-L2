import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
    
    useEffect(() => {
        const setClass = (className) => {
            document.body.classList.forEach((s, n, p) => { document.body.classList.remove(s); });
            document.body.classList.add(className);
        };

        setClass(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    )
};