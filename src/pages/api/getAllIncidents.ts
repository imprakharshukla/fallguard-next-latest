// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {initFirebase} from "@/pages/api/_firebase/init";
import admin from "firebase-admin";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await initFirebase()
    console.log(req.query);
    // @ts-ignore
    let requestData: { device_id: string } = req.query;
    console.log(requestData)

    // @ts-ignore
    const data = []

    console.log("Fetching Current device status")
    await admin.firestore().collection('incidents').where("device_id", "==", requestData.device_id).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log("No active incidents")
                // @ts-ignore
                res.status(200).json({response: "No active incidents"})
            } else {
                snapshot.forEach(doc => {
                    data.push(doc.data())
                })
                console.log("Found an active incident")
                // @ts-ignore
                res.status(200).json({response: data})
            }
        })


}
