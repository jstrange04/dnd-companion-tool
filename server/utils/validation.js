const { validationResult } = require("express-validator");

function validate(req, res, next) {
    const error = validationResult(req);
    const hasError = !error.isEmpty();

    if (hasError) {
        res.status(400).json({ error: error.array() });
    } else {
        next();
    }
}

const validation = { validate }
module.exports = validation; 