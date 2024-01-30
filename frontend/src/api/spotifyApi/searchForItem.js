export async function searchForItem() {
  let accessToken = localStorage.getItem('access_token');

  const response = await fetch(
    'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album',
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  );

  const data = await response.json();
  console.log(data);
}
