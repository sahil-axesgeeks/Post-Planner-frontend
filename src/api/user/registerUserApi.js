export const registerUserApi = async (userData) => {
  const response = await fetch("http://localhost:5002/api/v1/createUser", {
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
