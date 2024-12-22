// components/ToastProvider.js
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Custom styling and configurations
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
