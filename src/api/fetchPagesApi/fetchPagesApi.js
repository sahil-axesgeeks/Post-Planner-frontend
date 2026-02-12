export const fetchPagesApi = async () => {
  const BASE_URL_POST = process.env.NEXT_PUBLIC_API_URL_post;
  // NEXT_PUBLIC_API_URL_post=http://localhost:5000
  console.log(BASE_URL_POST);

  let url = `${BASE_URL_POST}/auth/facebookPagesList`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 IMPORTANTs
    },
  });
  const data = await response.json();
  console.log("THE APPI RESPOSNE-FETCH-PAGES");
  console.log(data, "THE DATACOMES 😴😴😴😴😴😴😴");
  return data;
};
