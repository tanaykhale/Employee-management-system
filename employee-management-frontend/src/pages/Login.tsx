import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: "top-right",
    });
  };
  const handleError = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo: any = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
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
        Login
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
        <form onSubmit={handleLogin}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              onChange={handleChange}
              type="email"
              name="email"
              label="Email Address"
              variant="outlined"
              value={loginInfo.email}
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
              value={loginInfo.password}
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
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
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
};

export default Login;
