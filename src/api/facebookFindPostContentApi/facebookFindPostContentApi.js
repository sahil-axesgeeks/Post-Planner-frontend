export const FacebookFindPostContentApi = async (postTemplateId) => {
  try {
    console.log(postTemplateId); //697d85360189fd23947d1ecb
    if (!postTemplateId) {
      throw new Error("postTemplateId fucker is required");
    }

    const response = await fetch(
      `http://localhost:5000/auth/allscheduledposts/${postTemplateId}`,
      {
        method: "GET",
        credentials: "include", // ✅ REQUIRED for cookies
        headers: {
          "Content-Type": "application/json",
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
