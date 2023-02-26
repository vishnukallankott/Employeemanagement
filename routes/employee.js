
const {addEmployee,addJobStatus,getEmployeeStatus}=require('../controller/employee')

module.exports=function(router){

    router.post('/addemp',addEmployee)
    router.post('/addjobstatus',addJobStatus)
    router.get('/empjobstatus',getEmployeeStatus)



    return router
}