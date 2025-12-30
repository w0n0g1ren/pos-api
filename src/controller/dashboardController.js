const models = require('../models/dashboardModels.js');

const getDashboardData = async (req, res) => {
    try {
    const employee_code = req.params.employee_code;
    const data = await models.getDashboardData(employee_code);

    if(!data || data.length == 0) {
        res.status(404).json({
            message: 'Data not found',
            data:[]
        })
    } else {
        res.json({
            message: "Succesfully get Dashboard data",
            data : data
        })
    }

    } catch (error) {
        console.error('Get Dashboard Data Error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            server_error_message: error.message
        });
    }
}

module.exports = {
    getDashboardData
}

