const {DataTypes,fn}=require('sequelize')
const db=require('../config/dbConfig')
const userModel=db.define('user',
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true},
    name:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    address:{
        type:DataTypes.STRING(200),
        allowNull:true
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    date_of_birth:{
        type:DataTypes.DATE()
    }  
},
{
    freezeTableName:true
})
module.exports=userModel