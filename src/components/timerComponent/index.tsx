import React from "react";
import {useTimer} from "react-timer-hook";

// @ts-ignore
function TimerComponent({expiryTimestamp, onExpiry}) {
    const {
        seconds,
        minutes,
    } = useTimer({
        expiryTimestamp, onExpire: () => {
            onExpiry()
        }
    });

    return (
        <div>
            <div className={"mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"}>
               <span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </div>
    )
}

export default TimerComponent;