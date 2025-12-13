require('dotenv').config();

const ftp = require('basic-ftp');
const { Readable } = require('stream');
const path = require('path');
const { randomUUID } = require('crypto');

const uploadToFTP = async(fileBuffer, originalName) => {
    const client  = new ftp.Client();

    try {
        await client.access({
            host: process.env.FTP_HOST,      
            user: process.env.FTP_USER,
            // password: process.env.FTP_PASSWORD,
            secure: true,
            secureOptions: { rejectUnauthorized: false }
        });

        const uniqueSuffix = randomUUID();
        const fileExtension = path.extname(originalName);
        const remoteFileName = `${uniqueSuffix}${fileExtension}`;

        const targetDir = '/uploads';
        const remotePath = `${targetDir}/${remoteFileName}`;

        await client.ensureDir(targetDir);
        const sourceStream = Readable.from(fileBuffer);

        await client.uploadFrom(sourceStream, remotePath);
        
        return remoteFileName;
    } catch(err) {
        console.error('FTP Upload Error:', err);
        throw new Error('Failed to upload file to FTP server');
    } finally {
        client.close();
    }
}

module.exports = {uploadToFTP};