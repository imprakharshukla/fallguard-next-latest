import '../styles/globals.css'
import {ComponentType, useEffect, useState} from "react";
import type {AppProps} from "next/app";
import {ThemeProvider, useTheme} from "next-themes";
import {Theme, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {DarkModeToggle} from "components";

type ComponentWithLayout = AppProps & {
    Component: AppProps['Component'] & {
        pageLayout?: ComponentType
    }
}

export default function App({Component, pageProps}: ComponentWithLayout) {
    return (
        <ThemeProvider attribute="class" enableSystem={true}>
            <ToastThemeWrapper/>
            <div className={'flex flex-row items-center gap-1 w-fit mx-auto'}>
                Toggle&nbsp;Theme&nbsp;-
                <DarkModeToggle/>
            </div>
            {
                Component.pageLayout ?
                    (
                        <Component.pageLayout {...pageProps}>
                            <Component {...pageProps}/>
                        </Component.pageLayout>
                    )
                    :
                    (
                        <Component {...pageProps}/>
                    )
            }
        </ThemeProvider>
    );
}

const ToastThemeWrapper = () => {
    const {theme, systemTheme} = useTheme();

    const [toastTheme, setToastTheme] = useState<Theme>("dark");

    useEffect(() => {
        if (theme === "dark") {
            setToastTheme("dark");
        } else if (theme === "light") {
            setToastTheme("light");
        } else if (theme === "system") {
            if (systemTheme === "dark") {
                setToastTheme("dark");
            } else if (systemTheme === "light") {
                setToastTheme("light");
            }
        }
    }, [theme, systemTheme]);

    const [toastPosition, setToastPosition] = useState(toast.POSITION.TOP_RIGHT);

    useEffect(() => {
        setToastPosition(
            window.innerWidth > 1024
                ? toast.POSITION.TOP_RIGHT
                : toast.POSITION.BOTTOM_CENTER
        );
    }, []);

    return (
        <ToastContainer
            className={"relative mt-20 "}
            //position top-right on large screens and bottom-center on small screens
            position={toastPosition}
            theme={toastTheme}
        />
    );
};
