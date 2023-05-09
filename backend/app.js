const express = require('express');
const app = express();
app.use(express.json());

let records = [];

app.get('/api/records', (req, res) => {
  res.json({ records });
});

app.post('/api/records', (req, res) => {
  const record = req.body;
  records.push(record);
  res.status(201).json({ message: 'Запись сохранена', record });
});

app.delete('/api/records/:id', (req, res) => {
  const id = req.params.id;
  records = records.filter(record => record.id !== id);
  res.json({ message: 'Запись удалена' });
});

app.put('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const updatedRecord = req.body;
  records = records.map(record => {
    if (record.id === id) {
      return { ...record, ...updatedRecord };
    }
    return record;
  });
  res.json({ message: 'Запись изменена' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});