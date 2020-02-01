const express = require('express')
const request = require('request-promise')
const app = express()
const port = 3000
const url = 'https://nexushub.co/warframe'
const suggestions = 'https://api.nexushub.co/warframe/v1/suggestions?query='
const format = str => str.split(' ').join('-').toLowerCase()
const missing = {}

app.get('/', (req, res) => res.redirect(301, `${url}/`))

app.get('/NexusBot', (req, res) => res.redirect(301, `${url}/`))

app.get('/feedback', (req, res) => res.redirect(301, `https://nexushub.co/contact`))

app.get('/how_we_get_our_stats', (req, res) => res.redirect(301, `https://nexushub.co/opensource`))

app.get('/privacy_policy', (req, res) => res.redirect(301, `https://nexushub.co/privacy`))

app.get('/categories', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input=nova%20prime'))
app.get('/prime', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input= prime'))
app.get('/syndicate', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input=vaykor'))
app.get('/special', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input=nezha'))
app.get('/arcane', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input=arcane'))
app.get('/prisma', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input=prisma'))
app.get('/mods', (req, res) => res.redirect(301, 'https://nexushub.co/warframe/search?input=maim'))

app.get('/:category/:item', async (req, res) => {
  const category = req.params.category.toLowerCase()
  const item = req.params.item

  if (category === 'prime') {
    res.redirect(301, `${url}/items/${format(item + ' ' + category)}/prices`)
  }
  else if (category === 'kavat') {
    res.redirect(301, `${url}/items/${format(item + ' ' + category)}`)
  }
  else if (category === 'special') {
    res.redirect(301, `${url}/items/${format(item)}`)
  }
  else if (category === 'arcane') {
    res.redirect(301, `${url}/`)
  }
  else if (item.includes('primed')) {
    if (!missing[item]) {
      const full = JSON.parse(await request.get(suggestions + item))

      if (full[0]) {
        missing[item] = format(full[0].name)
        res.redirect(301, `${url}/items/${missing[item]}/prices`)
      } else {
        res.redirect(301, `${url}/`)
      }
    } else {
      res.redirect(301, `${url}/items/${format(missing[item])}/prices`)
    }
  }
  else {
    res.redirect(301, `${url}/items/${format(item)}/prices`)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
