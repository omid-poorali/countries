import { Enums } from "@/constants";

export type APIRequest = {
  get: <A>(url: string) => Promise<A>;
};

function request(): APIRequest {

  const get = (url: string) => {
    const requestOptions = {
      method: Enums.HTTPMethod.GET,
    };
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, requestOptions).then(handleResponse);
  }


  const handleResponse = (response: Response) => {
    return response.text().then(text => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }

  return {
    get
  };
}

export default request();
