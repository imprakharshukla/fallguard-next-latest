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

            let imageUrl = "";

            console.log("Uploading to imgbb");

            
            const form = new FormData();
            form.append("image", body.image);

            const options = {
            method: 'POST',
            url: 'https://api.imgbb.com/1/upload',
            params: {expiration: '600', key: '75b5951891da0b10b0f54dd649f2f138'},
            headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
            data: '[form]'
            };

            const imageReq = await axios.request(options);

            console.log({
                imageReqData: imageReq.data
            })

            imageUrl = imageReq.data.url;
            if(imageUrl.length === 0){
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
