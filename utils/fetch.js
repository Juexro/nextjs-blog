async function get(url) {
  const response = await fetch(`${process.env.HOST || 'http://localhost:3000'}/api${url}`);
  return await response.json();
}

module.exports = {
  get
}