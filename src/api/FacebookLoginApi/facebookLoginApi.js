import { fetchPostFunction } from "../fetchPostFunction";
export const facebookApi = () => {
  let url = "http://localhost:5000/auth/facebook/Login";
  const response = fetchPostFunction(url);

  console.log(response, "👧👧👧");

  return response;
};
