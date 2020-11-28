import documents from '@/documents/index.json';

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    data: documents,
    code: 0,
    message: ''
  });
}
