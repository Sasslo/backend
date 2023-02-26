module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var companySchema = new Schema({
    image: String,
    name: { type: String, required: true },
    description: String,
    admin_email: String,
    admin_contact: String,
    domain_name: String,
    credential: { type: mongoose.Schema.Types.ObjectId, ref: "credential" },
  });

  return companySchema;
};
