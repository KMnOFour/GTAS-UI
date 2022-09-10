import { navigate } from "@reach/router";
import { hasData } from "../utils/utils";
import { FULLPATH_TO } from "../utils/constants";
import Cookies from "js-cookie";

const DELETEID = "The delete method requires a valid id parameter.";
const GET = "get";
const DELETE = "delete";
const POST = "post";
const PUT = "put";

export const GenericService = async props => {
  let param = {
    method: props.method,
    headers: {
      ...props.headers,
      Cookie: `JSESSIONID: ${Cookies.get("JSESSIONID")}`
    },
    credentials: "include"
  };

  param.body = props.body;

  return fetch(props.uri, param)
    .then(response => {
      // APB - LOGOUT ON 401 - implement separately
      // if (response.status === 401) {
      //   navigate(FULLPATH_TO.LOGIN);
      //   return [];
      // }
      if (response === undefined) {
        return [];
      }
      if (response.ok) {
        if (response.url.endsWith("/authenticate")) return response;
        if (response.url.includes("paxdetailreport")) return response.arrayBuffer();
        if (
          response.url.includes("attachmentId") ||
          (response.url.includes("logs") && props.uri.split("/").length === 8)
        )
          return response.blob();
        return response.json().then(res => res.data || res || response);
      } else {
        return response;
      }
    })
    .catch(error => {
      return error;
    });
};

export const get = (uri, headers, id, params) => {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}${
    hasData(params) ? params : ""
  }`;

  return GenericService({ uri: uricomplete, method: GET, headers: headers });
};

export const asJson = (cb, uri, headers, params) => {
  const result = cb(uri, headers, ...params);

  if (result.ok) {
    return result.json().then(res => res.data || res || result);
  }
  return result;
};

export const post = (uri, headers, body) => {
  return GenericService({
    uri: uri,
    method: POST,
    headers: headers,
    body: body
  });
};

export const put = (uri, headers, id, body) => {
  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return GenericService({
    uri: uricomplete,
    method: PUT,
    body: body,
    headers: headers
  });
};

export const putNoId = (uri, headers, body) => {
  return put(uri, headers, undefined, body);
};

export const del = (uri, headers, id) => {
  if (!hasData(id)) throw new TypeError(DELETEID);

  let uricomplete = `${uri}${hasData(id) ? `/${id}` : ""}`;

  return GenericService({
    uri: uricomplete,
    method: DELETE,
    headers: headers
  });
};

export const downloadWrap = (blob, fileName) => {
  var tempEl = document.createElement("a");
  document.body.appendChild(tempEl);
  tempEl.style = "display: none";
  var url = window.URL.createObjectURL(blob);
  tempEl.href = url;
  tempEl.download = fileName;
  tempEl.click();
  window.URL.revokeObjectURL(url);
  tempEl.remove();
};
