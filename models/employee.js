module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var employeeSchema = new Schema({
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "companys" },
    employee_id: String,
    name: String,
    gender: String,
    email: String,
    role: String,
    is_active: Boolean,
  });

  return employeeSchema;
};
