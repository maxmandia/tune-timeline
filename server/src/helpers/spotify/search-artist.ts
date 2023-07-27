export default async function searchArtist(search: string, token: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    let response = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      requestOptions
    );
    let result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
}
