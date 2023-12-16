const express = require('express')
const app = express()
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const https = require('https');
const path = require('path');
const fs = require('fs');

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const xhr = new XMLHttpRequest();
  const parser = new XMLParser();

  xhr.open('GET', 'https://www.youtube.com/feeds/videos.xml?channel_id=UC75PuTW7CZIQywEoHfjj8Ww');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const xml = parser.parse(this.responseText, '');
        const latest = xml.feed.entry[0];
        const videoId = latest['yt:videoId'];
        res.send(videoId);
    }
};
  xhr.send(null);
});

// const sslServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// }, app);

//sslServer.listen(443, () => console.log('secure server'));
app.listen(80, () => console.log("Server running"));
