import { INFOMATION, PACKAGE_INFO } from './enum';

export const Producer = {
  id: String,
  infomation: INFOMATION,
};

export const Customer = {
  id: String,
  infomation: INFOMATION,
};

export const Employee = {
  id: String,
  infomation: INFOMATION,
};

export const Deliver = {
  id: String,
  infomation: INFOMATION,
};

export const Manufacturer = {
  id: String,
  infomation: INFOMATION,
  phytosanitaryNumber: String, // mã kiểm dịch
};

export const Retailer = {
  id: String,
  infomation: INFOMATION,
};

export const Storage = {
  id: String,
  infomation: INFOMATION,
};

export const Certificate = {
  id: String,
  infomation: INFOMATION,
};

export const Form = {
  id: String,
  name: String,
  type: String,
  packType: String, // loại đóng gói
  weight: String,
  mfgDate: Number, //ngày xs
  expDate: Number, // hạn sử dụng
  origin: String,
  description: String,
};
