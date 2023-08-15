const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/www/'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.post('/subscription-callback', function(req, res){
  html_content = `<script>
  window.parent.history.back();
  window.close();
</script>`;
  res.set('Content-Type', 'text/html');
  res.send(new Buffer(html_content));
})
// default Heroku PORT
app.listen(process.env.PORT || 3000);