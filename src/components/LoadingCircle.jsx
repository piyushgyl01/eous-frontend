import { Box, CircularProgress } from "@mui/material";

export default function LoadingCircle() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    </>
  );
}
