export const DecodeUserDetail = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${BASE_URL}/api/v1/userDetails`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "CANT FETCHED THE USER DETAILS");
  }
  const data = await response.json();
  console.log("THE USER DETAILS ARE", data);
  return data;
};
