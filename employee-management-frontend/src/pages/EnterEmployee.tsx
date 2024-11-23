import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

const EnterEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, courses: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(formData);
    const updatedFormData = {
      ...formData,
      courses: formData.courses.split(",").map((course) => course.trim()), // Convert comma-separated string to an array
    };

    try {
      const url = `http://localhost:8080/details`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      // Check if response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Try to parse response as JSON
      const result = await response.json();

      const { success, message, error } = result;

      if (success) {
        console.log("Data sent to Mongo server");
        // setTimeout(() => {
        //   navigate("admin");
        // }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        console.log(details);
      } else if (!success) {
        console.log(message);
      }

      console.log(result);
    } catch (error: unknown) {
      // Catch network errors or other unexpected errors
      console.log("Error during submission:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "10px auto",
        padding: "20px",
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "left",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "left",

          fontWeight: "bold",
        }}
      >
        Create
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Mobile Number */}
        <TextField
          fullWidth
          label="Mobile No"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          margin="normal"
        />

        {/* Designation */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="designation-label">Designation</InputLabel>
          <Select
            labelId="designation-label"
            name="designation"
            value={formData.designation}
            onChange={(event) =>
              setFormData({ ...formData, designation: event.target.value })
            }
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
        </FormControl>

        {/* Gender */}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        {/* Courses */}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Course</FormLabel>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  value="MCA"
                  checked={formData.courses.includes("MCA")}
                  onChange={handleCheckboxChange}
                />
              }
              label="MCA"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="BCA"
                  checked={formData.courses.includes("BCA")}
                  onChange={handleCheckboxChange}
                />
              }
              label="BCA"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="BSC"
                  checked={formData.courses.includes("BSC")}
                  onChange={handleCheckboxChange}
                />
              }
              label="BSC"
            />
          </Box>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            paddingY: 1.5,

            backgroundColor: "green",
            ":hover": { backgroundColor: "darkgreen" },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EnterEmployee;
