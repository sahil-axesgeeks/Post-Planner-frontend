export const updateScheduledPostApi = async (postId, payload) => {
  const response = await fetch(
    `http://localhost:5000/auth/scheduled-post/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  return response.json();
};
