const db = require('../config/database');

const generateTransactionCode = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const prefix = `CSH/${year}/${month}/${day}/`;
    const lastTransaction = await db('tr_cashier')
        .where('transaction_code', 'like', `${prefix}%`)     
        .orderBy('id', 'desc')
        .first();

    let newSequence = 1;

if (lastTransaction) {
        const lastCode = lastTransaction.transaction_code; 
        if (lastCode) {
            const parts = lastCode.split('/');
            const lastSeq = parseInt(parts[parts.length - 1]);
            newSequence = lastSeq + 1;
        }
    }
    const sequenceString = String(newSequence).padStart(3, '0');

    return `${prefix}${sequenceString}`;
};

module.exports = generateTransactionCode;