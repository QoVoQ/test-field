const express = require('express')
const app = express()
const PORT = 8430

app.get('/block.js', (req, res, next) => {
  res.set('Content-Type', 'application/javascript')
  res.status(200)
  res.write('')
})

app.get('/log.js', (req, res) => {
  res.set('Content-Type', 'application/javascript')
  res.status(200)
  res.end('console.log("js called")')
})

app.use('/', express.static('dist'))
app.get('/hello', (req, res) => {
  res.json({ msg: 'Hello' })
})

// when using `preload`, resource will not be used automatically, for example,
// js file won't run right away once preload finish, you need another `script`
// to with the same `src` the execute the preloaded js file
app.get('/stream-html', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200)
  res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Test preload</title>
    <script>
      window.onload = function() {
        console.log('window load')
      }
    </script>
    <link rel="preload" as="script" href="/log.js" />

    <style>
      .box {
        height: 500px;
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <script src="/log.js"></script>
  </body>
  `)

  setTimeout(() => {
    res.end('</html>')
  }, 0)
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening port: ${PORT}`)
})
