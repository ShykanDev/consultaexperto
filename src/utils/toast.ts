import { useToast, TYPE } from "vue-toastification";

const toast = useToast();

export const showToast = (message: string, type: TYPE = TYPE.INFO) => {
  toast(message, { type });
};

// For backward compatibility with the components' presentToast function
export const presentToast = (message: string, color: string = "light") => {
  let type: TYPE = TYPE.INFO;
  if (color === "success") type = TYPE.SUCCESS;
  if (color === "danger") type = TYPE.ERROR;
  if (color === "warning") type = TYPE.WARNING;

  toast(message, { type });
};
