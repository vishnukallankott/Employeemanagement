const {DataTypes,fn}=require('sequelize')
const db=require('../config/dbConfig')
const employeeJobStatusModel=db.define('employee_job_status',
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true},
    empId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: "employee",
          key: "id",
        }
    },
    job_status:{
        type: DataTypes.ENUM,
        values: [
            'complete',
            'cancel',
            'pending'
        ],
        defaultValue: 'pending'
    }
},
{
    freezeTableName:true
})
module.exports=employeeJobStatusModel