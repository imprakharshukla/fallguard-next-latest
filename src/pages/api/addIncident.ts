// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {initFirebase} from "@/pages/api/_firebase/init";
import admin from "firebase-admin";
import axios from "axios";


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
        const snap = await admin.firestore().collection('incidents').get()
        snap.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            //update the doc fallen to true
            admin.firestore().collection('incidents').doc(doc.id).update({
                fallen: false
            })
        })
        res.status(200).json({response: "Added the incident"})
        try {
            await admin.firestore().collection('incidents').add({
                time: body.time,
                image: body.image,
                device_id: body.device_id,
                fallen: true
            })

            await axios.post("https://api.telegram.org/bot5802433708:AAHPM3_4da2-7PrdPv4-gF_S8__hoiL0HHc/sendMessage", {
                    chat_id: '919917110',
                    photo: body.image,
                    // @ts-ignore
                    text: `${doc.data().person_name} has fallen down at ${doc.data().address}}. Please respond in time. We are continuously monitoring.`,
                    parse_mode: "HTML"
                }
            )
            res.status(200).json({response: "Added the incident"})
        } catch (e) {
            console.log({error: e})
            res.status(400).json({error: e})
        }
    }


}
