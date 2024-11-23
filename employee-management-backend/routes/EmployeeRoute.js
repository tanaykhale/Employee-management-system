const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// POST route to save employee data
router.post("/", async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, courses } = req.body;

        // Create new employee document
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            courses,
        });

        // Save the document to the database
        await newEmployee.save();

        // Respond with success message
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

module.exports = router;
