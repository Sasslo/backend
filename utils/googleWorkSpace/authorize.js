const { google } = require("googleapis");
const process = require("process");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
let config = require("../../services.json")[ENV];

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
 * To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */

const oauth2Client = new google.auth.OAuth2({ ...config.google });

// Generate a url that asks permissions for below
const authorizationUrlGenerator = () =>
  oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: [
      "https://www.googleapis.com/auth/admin.directory.user",
      "https://www.googleapis.com/auth/admin.reports.usage.readonly",
      "https://www.googleapis.com/auth/admin.reports.audit.readonly",
    ],
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
  });

/**
 * callback Redeem code to get token and save in our database
 */

const tokenReedem = async (code) => {
  let { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

module.exports = {
  authorizationUrlGenerator,
  tokenReedem,
};
