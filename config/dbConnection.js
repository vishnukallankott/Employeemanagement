const database=require('../config/dbConfig')
const userModel=require('../model/userModel')
const employeeModel=require('../model/employee')
const employeeJobStatusModel=require('../model/employee_job_staus')
const connection=async()=>{
try{
await database.authenticate();
await database.sync({alter:true});
console.log("Database Connection Established successfuylly")
    }
    catch(e){
     console.log("error occured",e.message)
    }
}
module.exports=connection