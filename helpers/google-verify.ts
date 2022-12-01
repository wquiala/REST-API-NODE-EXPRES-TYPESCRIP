import config from "config";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(config.get("google_client_id"));
export const googleVerify = async (id_token: string = "") => {
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: config.get("google_client_id"), // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  if (payload !== undefined) {
    const { name: nombre, email: correo, picture: img } = payload;
    return { nombre, correo, img };
  }
  throw new Error("el payload es undefine");

  //   const name = payload?.name;
  //   const email = payload?.email;
  //   const picture = payload?.picture;

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};
