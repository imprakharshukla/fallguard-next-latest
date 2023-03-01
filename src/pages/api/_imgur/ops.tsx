// ESModule syntax
import {ImgurClient} from 'imgur';
// all credentials with a refresh token, in order to get access tokens automatically
const client = new ImgurClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
});


export const uploadImage = ({photo, title, device_id}:
                                {
                                    photo: string,
                                    title: string,
                                    device_id: string
                                }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await client.upload({
                image: photo,
                title: title,
                description: 'This is a test image',

                type: 'base64',
                name: device_id,
            });
            console.log(response.data);
            console.log(`Image uploaded successfully to`)
            resolve(response.data);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    })
}
