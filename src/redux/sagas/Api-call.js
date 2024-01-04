import axios from 'axios';

export const commonApiCall = (options) => async () => {
  const { url, method, params, body } = options;
  return axios.request({
    url,
    method,
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: body
  })
    .then(
      (res) => {
        return res;
      }, (error) => {
        if (error) {
          console.log("====================>>>>>>>Error")
        }
      }
    )
}
