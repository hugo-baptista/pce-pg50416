let CaretakerSchema = require('../model/caretaker');

module.exports.newCaretaker = async (id, name) => {
    try {
        let caretaker = new CaretakerSchema({id, name});
        let response = await caretaker.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}