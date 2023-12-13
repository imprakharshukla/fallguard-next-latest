// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import FormData from "form-data";

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

            const apiUrl = 'https://api.imgbb.com/1/upload';
            const apiKey = '75b5951891da0b10b0f54dd649f2f138';

            let imageUrl = "";

            console.log("Uploading to imgbb");

            const formData = new FormData();
            formData.append('image', body.image);

            // Axios request
            const response = await axios.post(`${apiUrl}?expiration=600&key=${apiKey}`, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });


            imageUrl = response.data.data.url;

            console.log({
                imageUrl
            })

            if(!imageUrl || imageUrl.length === 0){
                res.status(400).json({
                    "error": "No image URL"
                })
            }


            console.log("Sending a message to telegram")

            await axios.post(
                "https://api.telegram.org/bot6713449238:AAGkdF2Z1G-f_bzd-vEQVrPPSjJd8sIscOs/sendPhoto", {
                    chat_id: '773397969',
                    photo: imageUrl,
                    // @ts-ignore
                    caption: `<strong>${body.name}</strong> has been detected at ${body.location} on the device ${body.device_id}. Detection time-${body.time} Please respond in time. We are continuously monitoring.`,
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
