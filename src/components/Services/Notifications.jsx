import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const ErrorMessage = message => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
