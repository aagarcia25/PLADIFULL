import axios from "axios";

/**
 * MANEJO AUTOMATICO DE PETICIONES
 *
 * ADOLFO ANGEL GARCIA 10/08/2022
 */

const getHeaderInfo = async function () {
  return {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
    },
  };
};

const handleResponse = (response: any) => {
  let rs;
  rs = {
    RESPONSE: response.RESPONSE,
    SUCCESS: response.SUCCESS,
    NUMCODE: response.NUMCODE,
    STRMESSAGE: response.STRMESSAGE,
  };
  return rs;
};

export const post = async function (url: string, body: any) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.post(
      process.env.REACT_APP_APPLICATION_BASE_URL + url,
      body,
      header
    );
    return handleResponse(resp.data);
  } catch (err: any) {
    return handleResponse(err.response);
  }
};

export const get = async function (url: any, params: any = {}) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.get(
      process.env.REACT_APP_APPLICATION_BASE_URL + url,
      { ...header, params }
    );
    return handleResponse(resp.data);
  } catch (err: any) {
    return handleResponse(err.response);
  }
};
