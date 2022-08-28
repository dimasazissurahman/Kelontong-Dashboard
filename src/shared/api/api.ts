import axios from "axios";
const url = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const postProduct = async (data: any) => {
  try {
    const res = await api.post(`${url}/product`, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
}

export const getProduct = async () => {
  try {
    const res = await api.get(`${url}/product`);
    return res;
  } catch (error: any) {
    return error.response;
  }
}