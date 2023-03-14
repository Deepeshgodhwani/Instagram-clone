

const production = {
  name: "production",
  asset_path:process.env.ASSET_PATH,
  session_cookie_key:process.env.SESSION_COOKIE_KEY,
  db:process.env.INSTAGRAM_CLONE_DB,
  URL:process.env.URL,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user:process.env.INSTAGRAM_CLONE_GMAIL_USERNAME,
      pass:process.env.INSTAGRAM_CLONE_GMAIL_PASSWORD,
    },
  },
  facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
  facebook_client_secret:process.env.FACEBOOK_CLIENT_SECRET,
  facebook_call_backURL: process.env.FACEBOOK_CALL_BACKURL,
};




module.exports = production;
