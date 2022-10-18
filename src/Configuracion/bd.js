const sequelize = require('sequelize');
const db = new sequelize(
    'medik',
    'root',
    'cesar123',
    {
        host:'localhost',
        dialect:'mysql',
        port: '3306'
    }
);
module.exports=db;