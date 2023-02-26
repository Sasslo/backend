module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var activitySchema = new Schema({
    company_id: String,
    employee_id: String,
    product_id: String,
    app_name: String,
    login_time: String,
    login_type: String,
  });

  return activitySchema;
};
