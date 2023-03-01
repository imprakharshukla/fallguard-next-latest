import admin from "firebase-admin";
import { getApps } from "firebase/app";

export const initFirebase = (): Promise<Boolean> => {
  const adminCreds = process.env.GOOGLE_CREDS;
  try {
    console.log({ apps: getApps().length });
    if (admin.apps.length === 0) {
      const adminString = Buffer.from(adminCreds as string, "base64").toString();
      const adminObj = JSON.parse(adminString);
      //  console.log({ adminObj });
      admin.initializeApp({
        credential: admin.credential.cert(adminObj)
      });
    }
    return Promise.resolve(true);
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
};