import { toast, ToastOptions } from "react-toastify";
const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
};

export const showToast = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
};