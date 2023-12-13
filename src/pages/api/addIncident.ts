// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    
    let body: {
        time: number,
        image: string,
        name: string,
        location: string,
        device_id: string,
    } = req.body;
    console.log({body});
        try {
            console.log("Sending a message to telegram")

            await axios.post(
                "https://api.telegram.org/bot6713449238:AAGkdF2Z1G-f_bzd-vEQVrPPSjJd8sIscOs/sendPhoto", {
                    chat_id: '773397969',
                    photo: body.image,
                    // @ts-ignore
                    caption: `<strong>${body.name}</strong> has been detected at ${body.location} on the device ${body.device_id}. </br> Detection time- ${body.time} </br> Please respond in time. We are continuously monitoring.`,
                    parse_mode: "HTML"
                }
            )
            console.log("Sent a message to telegram")
            res.status(200).json({response: "Added the incident"})
        } catch (e) {
            console.log({error: e})
            res.status(400).json({error: e})
        }
}
