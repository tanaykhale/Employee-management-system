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
import { toast } from "react-toastify";

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
      course: formData.courses, // Map 'courses' to 'course' for backend
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      const { success, message, error } = result;

      if (success) {
        toast.success("Data sent to Mongo server", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else if (error) {
        const details = error?.details[0].message;
        console.log(details);
      } else if (!success) {
        console.log(message);
      }

      console.log(result);
    } catch (error: unknown) {
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
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Mobile No"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          margin="normal"
        />

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

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Course</FormLabel>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  value="MCA"
                  checked={formData.courses === "MCA"} // Compare the value for single selection
                  onChange={handleCheckboxChange}
                />
              }
              label="MCA"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="BCA"
                  checked={formData.courses === "BCA"}
                  onChange={handleCheckboxChange}
                />
              }
              label="BCA"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="BSC"
                  checked={formData.courses === "BSC"}
                  onChange={handleCheckboxChange}
                />
              }
              label="BSC"
            />
          </Box>
        </FormControl>

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
