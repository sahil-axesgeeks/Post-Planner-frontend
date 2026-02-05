// export const loginAuthApi = async (userData) => {
//   console.log("DATA OF LOGIN-AUTH-API", userData);
//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
//   console.log(BASE_URL);
//   const response = await fetch(`${BASE_URL}/api/v1/UserLogin`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.status) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Registration failed");
//   }
//   // console.log("LOGGEED IN USER DATA", data.json());
//   // console.log("DATA OF LOGIN-AUTH-API🚗🚗");
//   return response.json();
// };
export const loginAuthApi = async (userData) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${BASE_URL}/api/v1/UserLogin`, {
    method: "POST",
    credentials: "include", // use if backend sets HTTP-only cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();

  // ⚡ Save token in cookie if backend returns it
  if (data.token) {
    document.cookie = `token=${data.token}; path=/; max-age=3600`;
  }

  return data;
};
