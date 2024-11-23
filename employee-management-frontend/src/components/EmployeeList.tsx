import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";

// Define the Employee type here
interface Employee {
  _id: string;
  name: string;
  email: string;
  mobileNo: string;
  designation: string;
  gender: string;
  course: string;
  createdAt: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchEmployees = async () => {
        try {
          const response = await getEmployees(token);
          setEmployees(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch employees");
        }
      };

      fetchEmployees();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email} - {employee.designation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
