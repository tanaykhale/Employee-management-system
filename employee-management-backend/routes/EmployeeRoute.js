const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// POST route to save employee data
router.post("/", async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.json({ success: true, message: "Employee data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving employee data", error });
    }
});
router.get("/", async (req, res) => {
    try {
        // Fetch all employee documents from the database
        const employees = await Employee.find();

        // Respond with the list of employees
        res.json({ success: true, employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving employee data", error });
    }
});
router.delete('/details/:id', async (req, res) => {
    console.log("Delete request received for ID:", req);
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.remove({ _id: id });
        console.log(deletedEmployee)
        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
module.exports = router;
