import { useState } from "react";

export default function useNotification() {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

    const handleSnackbarClose = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return { snackbar, setSnackbar, handleSnackbarClose };
  }