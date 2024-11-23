import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo: any = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err: any) {
      handleError(err);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 6,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Signup
      </Typography>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          maxWidth: "400px",
          boxShadow: 6,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <form onSubmit={handleSignup}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              onChange={handleChange}
              type="text"
              name="name"
              label="Full Name"
              variant="outlined"
              value={signupInfo.name}
              fullWidth
              autoFocus
              InputProps={{
                style: { fontSize: 16 },
              }}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />

            <TextField
              onChange={handleChange}
              type="email"
              name="email"
              label="Email Address"
              variant="outlined"
              value={signupInfo.email}
              fullWidth
              InputProps={{
                style: { fontSize: 16 },
              }}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />

            <TextField
              onChange={handleChange}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={signupInfo.password}
              fullWidth
              InputProps={{
                style: { fontSize: 16 },
              }}
              InputLabelProps={{
                style: { fontSize: 14 },
              }}
            />
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Signup
          </Button>
          <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
            Already have an account?{" "}
            <MuiLink
              href="/login"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Login
            </MuiLink>
          </Typography>
        </form>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: "14px",
          textAlign: "center",
        }}
      />
    </Container>
  );
}

export default Signup;
