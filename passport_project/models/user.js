const pool = require('../modules/pool');
const table = 'user';

const user = {
    getUserByName: async (username) => {
        const query = `SELECT * FROM ${table} WHERE nickname = '${username}'`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getUserByName ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('getUserByNickname ERROR : ',err);
            throw err;
        }
    },
    checkUserByNickname: async(nickname)=>{
        const query = `select * from ${table} where nickname='${nickname}';`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('checkUserByNickname ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('checkUserByNickname ERROR : ',err);
            throw err;
        }
    },
    checkUserByEmail: async (email) => {
        const query = `SELECT * FROM ${table} WHERE email = '${email}';`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;
