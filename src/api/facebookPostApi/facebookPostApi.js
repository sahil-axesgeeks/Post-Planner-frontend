import { fetchPostFunction } from "@/api/fetchPostFunction";

export const FacebookPostApi = async (userData) => {
  try {
    // to create a scheduled post
    const url = "http://localhost:5000/auth/scheduleFaceBookPost";

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
