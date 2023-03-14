const express = require("express");
const validator =require("../middlewares/errorValidation")
const validation = require("./../middlewares/validations");
const employeeController=require("../controller/employee");
const advancedResults = require ("./../middlewares/advancedResult");
require('./../model/employee');
const mongoose = require("mongoose")
//const allowedUsers =require("./../middlewares/AuthorizeRole");

const employee= mongoose.model('employee');

const router = express.Router();
//Without Id
router.route("/employee")
.get(advancedResults(employee,{ path:"clinicId" , select: { _id:0 , name:1 } }),employeeController.getAllEmployees)
.post(validation.employeePost,validator,employeeController.addEmployee)


//Route ID
router.route("/employee/:id")
.get(
    validation.paramIdInt,validator,employeeController.getEmployeeById)
.delete(
    validation.paramIdInt,validator,employeeController.deleteById)
.patch(
    validation.paramIdInt,validator,employeeController.updateEmployee)
module.exports=router;