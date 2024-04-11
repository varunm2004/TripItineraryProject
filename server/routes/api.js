const { Trip } = require('../model/index');

const test = async () => {
    return await Trip.find({});
}

module.exports = { test };
