export const fetchPostFunction = async (url, userData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 IMPORTANTs
    },
    body: JSON.stringify(userData),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
};
