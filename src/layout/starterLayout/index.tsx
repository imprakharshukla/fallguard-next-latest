// @flow
import * as React from 'react';

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
                                            Fall Guard
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

                        </div>

                    </nav>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                        {props.children}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default StarterLayout;