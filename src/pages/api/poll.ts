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

    console.log("Fetching Current device status")
    // get the documents in the collections and iterate over them
    await admin.firestore().collection('incidents').where("device_id", "==", requestData.device_id).where("fallen", "==", true).limit(1).get()
        .then(snapshot => {
            if (snapshot.empty) {

                console.log("No active incidents")
                // @ts-ignore
                res.status(200).json({response: "No active incidents"})
            } else {
                console.log("Found an active incident")
                // @ts-ignore
                res.status(200).json({response: snapshot.docs[0].data()})
            }
        })


}
