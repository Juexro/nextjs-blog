import documents from '@/documents/index.json';

export default (req, res) => {
  const map = {};
  documents.forEach(doc => {
    const { tags, title, name, create_time } = doc;
    tags.forEach(tag => {
      if (!map[tag]) {
        map[tag] = [];
      }
      map[tag].push({
        title,
        name,
        create_time
      });
    })
  });

  res.statusCode = 200;
  res.json({
    data: Object.entries(map).map(([tag, articles]) => {
      return {
        tag,
        articles
      }
    }),
    code: 0,
    message: ''
  });
}
