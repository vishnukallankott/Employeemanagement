
const { response } = require('express')
const employeeModel = require('../model/employee')
const employeeJobStatusModel = require('../model/employee_job_staus')
const jobStatusModel = require('../model/employee_job_staus')
employeeJobStatusModel.belongsTo(employeeModel, { foreignKey: "empId" })
employeeModel.hasMany(jobStatusModel)
const { Sequelize, Model, DataTypes ,QueryTypes,Op} = require('sequelize');
const addEmployee = async (req, reply) => {
    try {

        const { name, email, phone } = req.body
        if (!name || !email || !phone) {
            return reply.status(406).send({
                status: false,
                message: "Not Acceptable",
                error: []
            })
        }
        const employeeDetails = await employeeModel.findOne({ where: { phone: phone } })
        if (employeeDetails) {
            return reply.status(406).send({ status: false, message: "Employee is already Registered", error: [] })
        }
        let data = {
            name, email, phone
        }

        const createData = await employeeModel.create(data)
        if (!createData) {
            reply.status(400).send({
                status: false,
                message: 'Bad Request',
                error: []
            })
        }
        reply.status(200).send({ status: true, message: "Success", result: { id: createData.id, name, email, phone } })
    }
    catch (erro) {
        reply.status(500).send({
            status: false,
            message: 'Failed',
            error: erro.message
        })
    }
}
const addJobStatus = async (req, reply) => {
    try {
        const { empId, job_status } = req.body
        if (!empId) {
            return reply.status(406).send({
                status: false,
                message: "Not Acceptable",
                error: []
            })
        }
        let data = {
            empId, job_status
        }
        const jobStatus = await employeeJobStatusModel.create(data)
        if (!jobStatus) {
            reply.status(400).send({
                status: false,
                message: 'Bad Request',
                error: []
            })
        }
        reply.status(200).send({ status: true, message: "Success", result: { empId, job_status: jobStatus.job_status } })
    }
    catch (erro) {
        reply.status(500).send({
            status: false,
            message: 'Failed',
            error: erro.message
        })
    }
}
const getEmployeeStatus = async (req, reply) => {
    try {
        let conditions = {
            order: [["createdAt", "desc"]],
          }
         const employeeData= await employeeModel.findAll()
          console.log(result)
        reply.status(200).send({
            'status': true,
            message: 'Success',
            result: result
        })

    }
    catch (e) {
        reply.status(500).send({
            status: false,
            message: "Failed",
            error: e.message
        })
    }
}
async function formatEmployees(employeeData){
    let details=[]

    for(let i=0;i<employeeData.length;i++){
        let obj={}
        const jobStatus =await employeeJobStatusModel.findAll({
            where: { empId: employeeData[i].id },
            order: [['createdAt', 'DESC']],
            limit: 1
        })
        jobStatus.map((e)=>{
            obj['id']=employeeData[i].id,
            obj['name']=employeeData[i].name,
            obj['email']=employeeData[i].email,
            obj['phone']=employeeData[i].phone
            obj['job_status']=e.job_status
            details.push(obj)
        })        
        }
        return  details

    }

module.exports =
{
    addEmployee, addJobStatus, getEmployeeStatus
}