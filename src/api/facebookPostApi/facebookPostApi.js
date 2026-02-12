import { fetchPostFunction } from "@/api/fetchPostFunction";

export const FacebookPostApi = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const BASE_URL_POST = process.env.NEXT_PUBLIC_API_URL_post;
    // NEXT_PUBLIC_API_URL_post=http://localhost:5000
    console.log(BASE_URL_POST);
    // to create a scheduled post
    const url = `${BASE_URL_POST}/auth/scheduleFaceBookPost`;

    // console.log(
    //   userData,
    //   "THE PAYLOAD AT THE FACEBOOK-POST-API 🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉",
    // );
    const response = await fetchPostFunction(url, userData);
    // console.log(
    //   response,
    //   "THE RESPOSNE I WILL CATCH ON THE FACEBOOK-POST-API😉😉😉",
    // );
    return response;
  } catch (error) {
    console.log(error);
  }
};
