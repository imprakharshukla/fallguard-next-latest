import Head from 'next/head'
import {StarterLayout} from "@/layout";
import {useEffect} from "react";
import {toast} from "react-toastify";

const Home = () => {
    useEffect(() => {
            console.log('Home page loaded');
            setTimeout(() => {
                toast.success('Home page loaded');
            }, 1000)
        },[])
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Next JS Starter"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1 className='font-sans text-red-400'>Home</h1>
            </main>
        </>
    )
}

Home.pageLayout = StarterLayout;

export default Home