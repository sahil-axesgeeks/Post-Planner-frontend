export const loginAuthApi = async (userData) => {
  console.log("DATA OF LOGIN-AUTH-API", userData);
  const response = await fetch("http://localhost:5002/api/v1/UserLogin", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
  console.log("LOGGEED IN USER DATA", data.json());
  console.log("DATA OF LOGIN-AUTH-API🚗🚗");
  return response.json();
};
