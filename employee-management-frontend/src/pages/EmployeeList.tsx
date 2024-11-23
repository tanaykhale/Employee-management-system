import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:8080/details");

        if (!response.ok) {
          throw new Error("Error fetching employee data");
        }

        const data = await response.json();
        setEmployees(data.employees || []); // Adjust for API response
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleDelete = async (id: string) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:8080/details/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message, {
            position: "top-center",
            autoClose: 3000,
          });
          // Remove the deleted employee from the state
          setEmployees(employees.filter((employee) => employee._id !== id));
        } else {
          toast.error(result.message || "Failed to delete employee", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Server error", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{`Error: ${error}`}</Typography>}
      {!loading && !error && employees.length === 0 && (
        <Typography>No employees found.</Typography>
      )}
      {!loading && !error && employees.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Unique Id</TableCell>

                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Course</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, idx) => (
                <TableRow key={idx}>
                  <TableCell>{employee._id}</TableCell>

                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobile}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.course}</TableCell>

                  <TableCell>
                    {/* <Button
                      color="primary"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </Button> */}
                    <Button
                      color="error"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  function handleEdit(employee) {
    console.log("Edit employee:", employee);
  }
};

export default EmployeeList;
