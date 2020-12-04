export async function get(url) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_HOST || 'http://localhost:3000'}/api${url}`);
  return await response.json();
}
