const express = require('express');
const cors = require('cors');
const bordyParser = require('body-parser');
const route = require('./routes');

const app = express();
const port = 3002;
app.use(cors());
app.use(bordyParser.json({ limit: '50mb' }));
app.use(bordyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('oi')
});
app.use('/api/v1/', route);
app.listen(port, () => { console.log(`Server run dev ${port}`) });