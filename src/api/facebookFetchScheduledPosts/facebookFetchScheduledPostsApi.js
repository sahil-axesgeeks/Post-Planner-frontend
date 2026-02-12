export const facebookFetchScheduledPostsApi = async (startEndDate) => {
  // to fetch all scheduled posts
  const token = localStorage.getItem("token");
  const BASE_URL_POST = process.env.NEXT_PUBLIC_API_URL_post;
  // NEXT_PUBLIC_API_URL_post=http://localhost:5000
  console.log(BASE_URL_POST);
  const response = await fetch(`${BASE_URL_POST}/auth/allscheduledposts`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
    },
    body: JSON.stringify({ startEndDate }),
  });
  console.log("LOG");

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  console.log(data, "📢📢");
  return data;
};
