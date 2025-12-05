import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#fff",
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});


const AlertToast = {
  success: (msg: string) => Toast.fire({ icon: "success", title: msg }),
  warning: (msg: string) => Toast.fire({ icon: "warning", title: msg }),
  error: (msg: string) => Toast.fire({ icon: "error", title: msg }),
};
export default AlertToast;