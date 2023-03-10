// const nodemailer = require("nodemailer");

// const { google } = require("googleapis");

// const { OAuth2 } = google.auth;
// const oauth_link = "https://developers.google.com/oauthplayground";

// const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

// const auth = new OAuth2(
//   MAILING_ID,
//   MAILING_SECRET,
//   MAILING_REFRESH,
//   oauth_link
// );

// exports.sendVerificationEmail = (email, name, url) => {
//   auth.setCredentials({
//     refresh_token: MAILING_REFRESH,
//   });
//   const accessToken = auth.getAccessToken();
//   const stmp = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: EMAIL,
//       clientId: MAILING_ID,
//       clientSecret: MAILING_SECRET,
//       refreshToken: MAILING_REFRESH,
//       accessToken,
//     },
//   });
//   const mailOptions = {
//     from: EMAIL,
//     to: email,
//     subject: "Facebook email verification",
//     html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
//   };
//   stmp.sendMail(mailOptions, (err, res) => {
//     if (err) return err;
//     return res;
//   });
// };

//-------------------------------------------------------

// const nodemailer = require("nodemailer");

// const { google } = require("googleapis");

// const { OAuth2 } = google.auth;
// const oauth_link = "https://developers.google.com/oauthplayground";
// const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

// const auth = new OAuth2(
//   MAILING_ID,
//   MAILING_SECRET,
//   MAILING_REFRESH,
//   oauth_link
// );

// exports.sendVerificationEmail = async (email, name, url) => {
//   auth.setCredentials({
//     refresh_token: MAILING_REFRESH,
//   });
//   const accessToken = await auth.getAccessToken();
//   console.log("access token = " + accessToken);
//   const stmp = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: EMAIL,
//       clientId: MAILING_ID,
//       clientSecret: MAILING_SECRET,
//       refreshToken: MAILING_REFRESH,
//       accessToken,
//     },
//   });
//   const mailOptions = {
//     from: EMAIL,
//     to: email,
//     subject: "Facebook email verification",
//     html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
//   };
//   stmp.sendMail(mailOptions, (err, res) => {
//     if (err) {
//       console.log("send mail error:\n" + err);
//       return err;
//     }
//     return res;
//   });
// };

//---------------------------------------------------------------------------------------------------------------------------------
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const { EMAIL, MAILING_ID, MAILING_ACCESS, MAILING_REFRESH, MAILING_SECRET } =
  process.env;

const oauth_link = "https://developers.google.com/oauthplayground";

//creating the client with id, secret, auth_link
const auth2client = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = async (email, name, url) => {
  try {
    //if the access token is expired then it'll regenerate the access token
    auth2client.setCredentials({
      refresh_token: MAILING_REFRESH,
    });

    const accessToken = await auth2client.getAccessToken();

    const smtp = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: MAILING_ID,
        clientSecret: MAILING_SECRET,
        refreshToken: MAILING_REFRESH,
        accessToken,
      },
    });

    const mailOptions = {
      from: EMAIL,
      to: email,
      html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;font-weight:600;color:#3b5998">
<img style="width:30px" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="" />
<span>Action requires : Activate your facebook account</span>
</div>
<div style="padding:.5rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;font-size:17px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;font-weight:600">
<span>Hello ${name}</span>
<div style="padding:10px 0;margin-bottom:.5rem">
<span style="padding:.5rem 0">
You recently created an account on Facebook. To complete your
registration, Please confirm your account.</span>
</div>
<a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600;border-radius:.5rem">Confirm your account</a>
<br />
<div style="padding-top:20px">
<span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay touch with all your friends, once
registered on facebook, you can share photos, organize events and much
moore.</span>
</div>
</div>`,
      subject: "Facebook verification email",
    };
    smtp.sendMail(mailOptions, (err, res) => {
      if (err) throw new Error(err);
      return res;
    });
  } catch (error) {
    console.log("error", error);
  }
};
