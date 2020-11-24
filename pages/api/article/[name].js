
export default (req, res) => {
  const { name } = req.query;
  const documents = require('../../../documents/index.json');
  
  const index = documents.findIndex(doc => doc.name === name);

  res.statusCode = 200;
  res.json({
    data: {
      prev: documents[index - 1],
      current: documents[index],
      next: documents[index + 1]
    },
    code: 0,
    message: ''
  });
}
