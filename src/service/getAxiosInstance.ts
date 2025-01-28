import axios, { AxiosInstance } from "axios";
import { hideLoader, showLoader } from "../redux/loader";
import { showModal } from "../redux/modals";
import { AppDispatch } from "../store";

let baseInstance: AxiosInstance;

interface SetAxiosInstance {
  url: string;
  dispatch: AppDispatch;
}

const setupAxiosInstance = ({
  url,
  dispatch,
}: SetAxiosInstance): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
  });

  instance.interceptors.response.use(
    (response) => {
      dispatch(hideLoader());
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      const modal = {
        show: true,
        title: "Something went wrong",
        error: error.response?.data?.message || error.response?.data?.error,
        status: error.response?.data?.statusCode,
      };
      dispatch(hideLoader());
      dispatch(showModal(modal));
      return Promise.reject(error);
    }
  );
  instance.interceptors.request.use(
    (conf) => {
      dispatch(showLoader());
      conf.headers["x-auth-token"] = localStorage.getItem("token");
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const setAxiosInstance = (dispatch: AppDispatch) => {
  baseInstance = setupAxiosInstance({
    url: import.meta.env.VITE_APP_API_URL || "",
    dispatch,
  });
};

export const getAxiosInstance = (): AxiosInstance => {
  if (baseInstance) {
    return baseInstance;
  }
  throw new Error("axiosInstance has not been initialised");
};
