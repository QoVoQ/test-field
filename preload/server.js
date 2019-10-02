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

app.get('/block.css', (req, res) => {
  res.set('content-type', 'text/css; charset="utf-8"')
  res.status(200)
  res.write(`
    body {
      background: pink;
    }
  `)

  setTimeout(() => {
    res.end()
  }, 3000)
})

/**
 * i) Loading of tag `link` will block browser's render process
 *  https://developers.google.com/web/tools/lighthouse/audits/blocking-resources
 *  https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#tracking_fpfcp
 * i) First paint takes place as soon as possible when
 * ii) `DOMContentLoad` event emits only when `</html>` reach browser
 * iii) `Load` event emits only when all sub resource like (img/script...) finish
 * iiii) `performance.getEntries()` contain metrics like `first paint`,
 * `first contentful paint`, dns lookup time, load time of specific resource.
 *
 * @see https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint
*/
app.get('/test-paint', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.status(200)
  res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Test style block render</title>
    <style>
      body {
        color: green;
      }
    </style>

    <script>
    console.log('attach event listener')

    document.addEventListener('DOMContentLoaded', () => {
      console.log('dom content loaded')
    })
    </script>

    </head>
    <body>
    <div class="box">213123</div>
    <link rel="stylesheet"  href="/block.css" />
    <div>lllsdsre</div>
</body>
  `)

  setTimeout(() => {
    res.end('</html>')
  }, 6000)
})
app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening port: ${PORT}`)
})
