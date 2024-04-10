const { Trip } = require('../model/index');

export const test = async () => {
    return await Trip.find({});
}