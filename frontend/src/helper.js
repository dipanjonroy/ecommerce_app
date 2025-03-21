import { toast } from "react-toastify";

export const successMessage = (msg) => {
  toast.success(msg, {
    position: "top-right",
    style: { fontSize: "14px" },
  });
};

export const errorMessage = (msg) => {
  toast.error(msg, {
    position: "top-right",
    style: { fontSize: "14px" },
  });
};
