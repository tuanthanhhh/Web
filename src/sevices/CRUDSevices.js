const connection = require("../config/database");

const getAllFilm = async ()=>{
    let [result, fields] = await connection.query('select * from Film');
    return result;
}

const getAllAccount = async ()=>{
    let [result, fields] = await connection.query('select * from account');
    return result;
}

module.exports = {
    getAllFilm,getAllAccount
}