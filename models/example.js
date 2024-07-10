const mg = require('mongoose');

const ExampleSchema = new mg.Schema({
    name: String
});

const ExampleModel = mg.model('Example', ExampleSchema);

module.exports = {
    ExampleModel
}

