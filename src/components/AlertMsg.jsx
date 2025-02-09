import { Alert } from "@mui/material";

export default function AlertMsg({ severity, messsage }) {
  return (
    <Alert severity={severity} sx={{ mb: 3 }}>
      {messsage}
    </Alert>
  );
}
