const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

async function generateKey(){
    const token=uuidv4();
    return token;
}

module.exports={generateKey};