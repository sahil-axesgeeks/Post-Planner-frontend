export const facebookFetchScheduledPostsApi = async (startEndDate) => {
  // to fetch all scheduled posts
  console.log("LOG");
  const response = await fetch("http://localhost:5000/auth/allscheduledposts", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
