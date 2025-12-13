
const db = require('../config/database');

const generateEmployeeCode = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const prefix = `${year}${month}`;
    const lastEmployee = await db('mst_employee')
        .where('employee_code', 'like', `${prefix}%`)
        .orderBy('id', 'desc')
        .first();

    let newSequence = 1;

    if (lastEmployee) {
       const lastCode = lastEmployee.employee_code;
        const lastSeq = parseInt(lastCode.slice(-3)); 
        
        newSequence = lastSeq + 1;
    }

    const sequenceString = String(newSequence).padStart(3, '0');

    return `${prefix}${sequenceString}`;
};

module.exports = generateEmployeeCode;