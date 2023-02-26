const { google } = require("googleapis");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
let config = require("../../services.json")[env];

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
 * To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */

const oauth2Client = new google.auth.OAuth2({ ...config.google });

/**
 * Sends all  the user details
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listUsers(auth) {
  oauth2Client.setCredentials(auth);
  const service = google.admin({ version: "directory_v1", auth: oauth2Client });
  const res = await service.users.list({
    customer: "my_customer",
    orderBy: "email",
  });

  const users = res.data.users;
  return users;
}

/**
 * Sends all the activity
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listActivities(auth) {
  oauth2Client.setCredentials(auth);
  const service = google.admin({ version: "reports_v1", auth: oauth2Client });
  const res = await service.activities.list({
    userKey: "all",
    applicationName: "token",
  });
  const activities = res.data.items;
  return activities;
}

module.exports = {
  listUsers,
  listActivities,
};
