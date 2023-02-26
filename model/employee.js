const {DataTypes,fn}=require('sequelize')
const db=require('../config/dbConfig')
const employeModel=db.define('employee',
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true},
    name:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(200),
        allowNull:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
    }
},
{
    freezeTableName:true
})
module.exports=employeModel