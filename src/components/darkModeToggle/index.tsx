import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

function DarkModeToggle() {
  /** using next-themes to get system theme and setTheme */
    const { theme, setTheme, systemTheme } = useTheme();

    /** isDarkMode state */
    const [isDarkMode, setIsDarkMode] = useState<boolean|null>(null);

    /** useEffect to set theme on load */
    useEffect(()=>{
        //if localstorage has theme, set it
        const localTheme = localStorage.getItem("theme");
        if(localTheme){
            setTheme(localTheme)
            setIsDarkMode(localTheme === "dark")
            return
        }
        if(systemTheme === "dark"){
            setTheme("dark")
            setIsDarkMode(true)
        }else{
            setTheme("light")
            setIsDarkMode(false)
        }

        setIsDarkMode(systemTheme === "dark")

    },[isDarkMode, setTheme, systemTheme, theme])

    /** toggleDarkMode function */
    const toggleDarkMode = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    /** return the DarkModeToggle component */
    return (
        <a className={`flex items-center justify-center w-full`}>
            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                <div className="relative text-xl bg-gray-100 dark:bg-gray-700 rounded-full p-2" onClick={toggleDarkMode}>
                    {
                        isDarkMode ? (
                            <RiSunLine className={"text-gray-700 dark:text-white"} />
                        ) : (
                            <RiMoonLine className={"text-gray-700 dark:text-white"} />
                        )
                    }
                </div>
            </label>
        </a>
    );
}

export default DarkModeToggle