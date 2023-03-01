import Head from 'next/head'
import {db} from "@/firebase";

import {doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import TimerComponent from "@/components/timerComponent";
import {StarterLayout} from "layout";


const Home = () => {
    const [incidents, setIncidents] = useState<any>([]);
    const [deviceData, setDeviceData] = useState<any>(null);
    const [currentIncident, setCurrentIncident] = useState<any>(null);
    const [incidentDetected, setIncidentDetected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchIfIncidentDetected = async () => {
        const unsub = onSnapshot(doc(db, "devices", "2398475huiwefh"), (doc) => {
            console.log("Current data: ", doc.data());
            setDeviceData(doc.data())
            if (doc.data()?.fallen === true) {
                setIncidentDetected(true)
                console.log("truuye")
            } else {
                setIncidentDetected(false)
                console.log("false")
            }
        });
    }
    const onTimerEnded = () => {
        alert("Calling the emergency contact")
    }
    useEffect(() => {
        fetchIfIncidentDetected()
    }, []);

    useEffect(() => {
        if (incidentDetected) {
            //fetch the incident
            console.log(`Fetching ${deviceData.incident_id}`)
            const docRef = doc(db, "incidents", deviceData.incident_id);
            const docSnap = getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    setCurrentIncident({id: doc.id, ...doc.data()})
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(e => {
                console.log(e)
            })


        }
    }, [incidentDetected]);


    return (
        <>
            <Head>
                <title>Fall Guard</title>
                <meta name="description" content="Next JS Starter"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={"min-h-screen"}>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                        {!incidentDetected ?
                            <div>
                                <div className={"flex justify-center items-center"}>
                                    <div className={""}>
                                        <p className="w-12 h-12 rounded-full bg-green-400 animate-ping"></p>
                                        <p className="w-12 h-12 -mt-12 absolute z-10 rounded-full bg-green-400"></p>
                                    </div>
                                </div>
                                <h1 className="mb-4 text-4xl mt-10 font-extrabold tracking-tight leading-none text-gray-800 md:text-5xl lg:text-6xl dark:text-white">Keeping you Safe</h1>
                                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">We
                                    have not detected any incidents! We are monitoring things in realtime.</p>
                                {deviceData &&
                                    <div>
                                        <p className="mb-8 text-md font-normal text-gray-400 sm:px-16 xl:px-48 dark:text-gray-400">{`${deviceData.person_name} - ${deviceData.address}`}
                                        </p>

                                        <p className="mb-8 mx-auto dark:bg-gray-800 px-5 py-3 bg-gray-100 rounded-full w-fit text-md font-normal text-gray-400 sm:px-16 xl:px-48 dark:text-gray-400">{`${deviceData.caretaker_phone} - ${deviceData.caretaker_name}`}
                                        </p>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <div className={"flex justify-center items-center"}>
                                    <div className={""}>
                                        <p className="w-12 h-12 rounded-full bg-red-400 animate-ping"></p>
                                        <p className="w-12 h-12 -mt-12 absolute z-10 rounded-full bg-red-400"></p>
                                    </div>
                                </div>
                                <h1 className="mb-4 text-4xl mt-10 font-extrabold tracking-tight leading-none text-gray-800 md:text-5xl lg:text-6xl dark:text-white">Alert!</h1>
                                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">We
                                    have detected a fall! Please acknowledge this within 2 minutes or we will
                                    automatically inform emergency services.</p>

                                <p className="mb-8 text-md font-normal text-gray-400 sm:px-16 xl:px-48 dark:text-gray-400">{`${deviceData.person_name} - ${deviceData.address}`}
                                </p>

                                <p className="mb-8 mx-auto dark:bg-gray-800 px-5 py-3 bg-gray-100 rounded-full w-fit text-md font-normal text-gray-400 sm:px-16 xl:px-48 dark:text-gray-400">{`${deviceData.caretaker_phone} - ${deviceData.caretaker_name}`}
                                </p>
                                {currentIncident?.image &&
                                    <div className={"flex justify-center items-center"}>
                                        <img src={currentIncident.image} alt=""/>
                                    </div>
                                }
                                <div>
                                    <h1 className="mb-4 text-2xl mt-10 font-bold tracking-tight leading-none text-gray-800 md:text-3xl lg:text-4xl dark:text-white">Please
                                        accept the response within</h1>
                                    {/*<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">4:06</p>*/}
                                    <TimerComponent onExpiry={onTimerEnded}
                                                    expiryTimestamp={
                                                        new Date().setSeconds(new Date().getSeconds() + 100)}/>

                                    <button type="button"
                                            onClick={async () => {
                                                setLoading(true)
                                                //update firebase incident
                                                console.log(currentIncident.id)
                                                console.log("Updating the doc")
                                                const washingtonRef = doc(db, "incidents", currentIncident.id);
                                                await updateDoc(washingtonRef, {
                                                    fallen: false
                                                });
                                                console.log("Updated the doc")
                                                setLoading(false)
                                            }
                                            }
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                        {loading &&
                                            <svg aria-hidden="true" role="status"
                                                 className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"/>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"/>
                                            </svg>
                                        }
                                        Accept
                                    </button>

                                </div>
                            </div>

                        }

                    </div>
                </section>
            </main>
        </>
    )
}

Home.pageLayout = StarterLayout;

export default Home