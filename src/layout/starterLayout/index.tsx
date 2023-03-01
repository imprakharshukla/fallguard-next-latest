// @flow
import * as React from 'react';
import DarkModeToggle from "../../components/darkModeToggle";

type Props = {
    children: React.ReactNode;
};

const StarterLayout = (props: Props) => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <header className="flex-shrink-0">
                    <nav className="bg-gray-800">
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        aria-controls="mobile-menu"
                                        aria-expanded="false"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        {/* Icon when menu is closed. */}
                                        {/* Menu open: "hidden", Menu closed: "block" */}
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                        {/* Icon when menu is open. */}
                                        {/* Menu open: "block", Menu closed: "hidden" */}
                                        <svg
                                            className="hidden h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0 flex items-center">
                                        <h1 className={"text-xl text-white font-bold"}>
                                            Wh3
                                        </h1>
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex space-x-4">
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a
                                                href="#"
                                                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Dashboard
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Team
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Projects
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Calendar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Mobile menu, show/hide based on menu state. */}
                        <div className="sm:hidden" id="mobile-menu">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <a
                                    href="#"
                                    className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Team
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Projects
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Calendar
                                </a>
                            </div>
                        </div>

                    </nav>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96 p-10 ">
                                <div className="flex flex-row items-center gap-1">
                                    This container is from
                                    <div
                                        className={'bg-gray-200 dark:bg-gray-800 text-xs px-1 py-0.5 rounded-sm text-red-400'}
                                        style={{fontFamily: 'monospace'}}>
                                        ./src/layout/starterLayout/index.js
                                    </div>
                                </div>
                                To use this layout, import it in your page and wrap your content with it.

                                {/**
                                 * Example:
                                 * import StarterLayout from '/layout';
                                 *
                                 * const MyPage = () => {
                                 *    return <div>My content</div>
                                 *     }
                                 *
                                 * MyPage.Layout = StarterLayout;
                                 *
                                 * export default MyPage;
                                 *
                                 */}
                                {props.children}
                            </div>
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StarterLayout;