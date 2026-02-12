export const updateScheduledPostApi = async (postId, payload) => {
  const BASE_URL_POST = process.env.NEXT_PUBLIC_API_URL_post;
  // NEXT_PUBLIC_API_URL_post=http://localhost:5000
  console.log(BASE_URL_POST);
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${BASE_URL_POST}/auth/scheduled-post/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  return response.json();
};
