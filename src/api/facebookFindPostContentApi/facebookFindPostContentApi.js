export const FacebookFindPostContentApi = async (postTemplateId) => {
  try {
    console.log(postTemplateId); //697d85360189fd23947d1ecb
    const token = localStorage.getItem("token");
    if (!postTemplateId) {
      throw new Error("postTemplateId fucker is required");
    }
    const BASE_URL_POST = process.env.NEXT_PUBLIC_API_URL_post;
    // NEXT_PUBLIC_API_URL_post=http://localhost:5000
    console.log(BASE_URL_POST);

    const response = await fetch(
      `${BASE_URL_POST}/auth/allscheduledposts/${postTemplateId}`,
      {
        method: "GET",
        credentials: "include", // ✅ REQUIRED for cookies
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 IMPORTANTs
        },
      },
    );

    // if (!response.ok) {
    //   throw new Error(`Request failed with status ${response.status}`);
    // }

    const postContent = await response.json();
    console.log("POST CONTENT:", postContent);

    return postContent;
  } catch (error) {
    console.error("FacebookFindPostContentApi error:", error);
    throw error;
  }
};
