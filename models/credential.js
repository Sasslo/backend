module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  /**
   * TODO ? change company_id to object id
   */
  var credentialSchema = new Schema({
    company_id: String,
    access_token: String,
    refresh_token: String,
    token_type: String,
    scope: String,
    id_token: String,
    expiry_date: Number,
  });

  return credentialSchema;
};
