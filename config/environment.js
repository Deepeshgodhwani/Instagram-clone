const development = {
  name: "development",
  asset_path: "assets",
  session_cokie_key: "X1zCZFS4FUBXgmfBf4OoxuivFyxfIZRq",
  db: "SOCIAL-MEDIA-APP_db",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "deepeshgodwani28@gmail.com",
      pass: "jyqcqbdflxasbbts",
    },
  },
  facebook_client_id: 815704369848691,
  facebook_client_secret: "755ac5fad26895e13617df18cc59a212",
  facebook_call_backURL: "http://localhost:8000/account/auth/facebook/callback",
};


const production = {
  name: "production",
  asset_path:process.env.ASSET_PATH,
  session_cookie_key:process.env.SESSION_COOKIE_KEY,
  db:process.env.INSTAGRAM_CLONE_DB,
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



module.exports=eval(process.env.INSTA_CLONE_INVIRONMENT) == undefined ? development : eval(process.env.INSTA_CLONE_INVIRONMENT);

// module.exports = development;
