const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const root = './';
const port = process.env.port || 3000;
const app = express();
//const publicweb = process.env.PUBLICWEB || './dist/publicweb';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(root, 'dist')));

//app.use(express.static(publicweb),routes);
app.use('/api', routes);

app.get('*', (req,res) => {
    res.sendFile('dist/index.html', {root});
});

app.listen(port, ()=> console.log(`API running on local host:${port}`)) 