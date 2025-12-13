const models = require('../models/users')

const getAllUsers = async (req, res) => {
    const [data] = await models.getAllUsers();
    res.json({
        message: 'succesfully get all data users',
        data : data
    })
}

const createNewUsers = (req, res) => {

    console.log(req.body);

    res.json({
        message: 'Create User Succesfully',
         data : req.body
    })
}

const updateUser = (req, res) => {
    res.json({
        message: "update users succesfully",
        data : req.params,
        user_data: req.body
    })
}

const deleteUsers = (req, res) => {
    res.json({
        message: "succesfully delete data",
        data: req.params
    })
}
module.exports = {
    getAllUsers,
    createNewUsers,
    updateUser,
    deleteUsers
}