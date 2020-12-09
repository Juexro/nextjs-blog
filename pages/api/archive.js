import documents from '@/documents/index.json';

export default (req, res) => {
  const map = {};
  documents.forEach(doc => {
    const { create_time, name, title } = doc;
    const date = new Date(create_time);
    const time = `${date.getFullYear()}年${date.getMonth() + 1}月`;

    if (!map[time]) {
      map[time] = [];
    }

    map[time].push({
      title,
      name,
      create_time
    });
  });

  res.statusCode = 200;
  res.json({
    data: Object.entries(map).map(([time, articles]) => {
      return {
        time,
        articles
      }
    }),
    code: 0,
    message: ''
  });
}
