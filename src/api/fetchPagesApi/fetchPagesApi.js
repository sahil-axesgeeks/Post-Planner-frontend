export const fetchPagesApi = async () => {
  let url = "http://localhost:5000/auth/facebookPagesList";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    "Content-Type": "application/json",
  });
  const data = await response.json();
  console.log("THE APPI RESPOSNE-FETCH-PAGES");
  console.log(data, "THE DATACOMES 😴😴😴😴😴😴😴");
  return data;
};
