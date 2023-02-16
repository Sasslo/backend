module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var testSchema = new Schema({
        name: String,
        age: Number
    });

    return testSchema;
}