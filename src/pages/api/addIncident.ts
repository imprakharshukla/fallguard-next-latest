// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {initFirebase} from "@/pages/api/_firebase/init";
import admin from "firebase-admin";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await initFirebase()
    let body: {
        time: number
        image: string
        device_id: string,
    } = req.body;
    console.log({body});

    // {
    //     "status": {
    //     "emergency_response_number": "104",
    //         "last_incident": {
    //         "_seconds": 1677646056,
    //             "_nanoseconds": 507000000
    //     },
    //     "caretaker_phone": 9936301367,
    //         "caretaker_name": "Prakhar",
    //         "person_name": "",
    //         "fallen": false,
    //         "address": "Sector 137, Noida"
    // }
    // }

    // update the doc with the new photo
    const doc = await admin.firestore().collection('devices').doc(body.device_id).get();
    const data = doc.data();
    if (data) {
        try {
            await admin.firestore().collection('incidents').doc(body.device_id).set({
                time: body.time,
                image: body.image,
                device_id: body.device_id,
                fallen: true
            }, {merge: true})
            res.status(200).json({response: "Added the incident"})
        } catch (e) {
            console.log({error: e})
            res.status(400).json({error: e})
        }
    }


}
