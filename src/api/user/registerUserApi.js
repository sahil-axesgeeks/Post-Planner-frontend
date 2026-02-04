export const registerUserApi = async (userData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log(BASE_URL);
  console.log(BASE_URL);
  const response = await fetch(`${BASE_URL}/api/v1/createUser`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // Handle HTTP errors
  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};
