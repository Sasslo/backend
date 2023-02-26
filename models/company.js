module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var companySchema = new Schema({
    image: String,
    name: String,
    description: String,
    admin_email: String,
    admin_contact: String,
    domain_name: String,
  });

  return companySchema;
};
