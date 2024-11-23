import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Panel
        </Typography>
        <Box display="flex" gap={3} mt={3}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              fontSize: "16px",
            }}
            onClick={() => {
              navigate("create");
            }}
          >
            Enter Employee Detail
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              fontSize: "16px",
            }}
            onClick={() => {
              navigate("display");
            }}
          >
            Show Employee List
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AdminPanel;
