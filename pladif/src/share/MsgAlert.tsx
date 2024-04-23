import Swal, { SweetAlertIcon } from "sweetalert2";

const MsgAlert = (title: string, text: string, icon: SweetAlertIcon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};

export default MsgAlert;
