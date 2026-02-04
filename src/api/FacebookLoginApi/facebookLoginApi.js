import { fetchPostFunction } from "../fetchPostFunction";
export const facebookApi = async () => {
  let url = "http://localhost:5000/auth/facebook/Login";
  const response = await fetchPostFunction(url);

  console.log(response, "👧👧👧");

  return response;
};
