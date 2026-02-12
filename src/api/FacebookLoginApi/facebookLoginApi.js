import { fetchPostFunction } from "../fetchPostFunction";
export const facebookApi = async () => {
  const BASE_URL_POST = process.env.NEXT_PUBLIC_API_URL_post;
  const token = localStorage.getItem("token");
  // NEXT_PUBLIC_API_URL_post=http://localhost:5000
  console.log(BASE_URL_POST);
  let url = `${BASE_URL_POST}/auth/facebook/Login`;
  const response = await fetchPostFunction(url);

  console.log(response, "👧👧👧");

  return response;
};
