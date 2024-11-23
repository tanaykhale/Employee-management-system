import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Employee Management System</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MuiLink
              href="/home"
              underline="none"
              sx={{
                color: "white",
                fontSize: "16px",

                ":hover": { textDecoration: "underline" },
              }}
            >
              Home
            </MuiLink>
            <MuiLink
              href="/display"
              underline="none"
              sx={{
                color: "white",
                fontSize: "16px",

                ":hover": { textDecoration: "underline" },
              }}
            >
              Employee List
            </MuiLink>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon sx={{ color: "white" }} />
              <Typography color="white">
                Welcome {loggedInUser || "User"}
              </Typography>
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                ":hover": {
                  borderColor: "#f5f5f5",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet></Outlet>
      <ToastContainer />
    </div>
  );
}

export default Home;
