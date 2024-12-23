import { atom } from "recoil";

export const showModalContext = atom({
  key: "showModal",
  default: false,
});

export const showPdfContext=atom({
  key:"showPdf",
  default:false
})
