const express = require('express')
const request = require('request-promise')
const app = express()
const port = 3000
const url = 'https://nexushub.co/warframe'
const suggestions = 'https://api.nexushub.co/warframe/v1/suggestions?query='
const format = str => str.split(' ').join('-').toLowerCase()
const missing = {}

app.get('/', (req, res) => res.status(301).redirect(`${url}/`))

app.get('/NexusBot', (req, res) => res.status(301).redirect(`${url}/`))

app.get('/feedback', (req, res) => res.status(301).redirect(`https://nexushub.co/contact`))

app.get('/how_we_get_our_stats', (req, res) => res.status(301).redirect(`https://nexushub.co/opensource`))

app.get('/privacy_policy', (req, res) => res.status(301).redirect(`https://nexushub.co/privacy`))

app.get('/categories', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input=nova%20prime'))
app.get('/prime', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input= prime'))
app.get('/syndicate', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input=vaykor'))
app.get('/special', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input=nezha'))
app.get('/arcane', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input=arcane'))
app.get('/prisma', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input=prisma'))
app.get('/mods', (req, res) => res.status(301).redirect('https://nexushub.co/warframe/search?input=maim'))

app.get('/:category/:item', async (req, res) => {
  const category = req.params.category.toLowerCase()
  const item = req.params.item

  if (category === 'prime') {
    res.status(301).redirect(`${url}/items/${format(item + ' ' + category)}/prices`)
  }
  else if (category === 'kavat') {
    res.status(301).redirect(`${url}/items/${format(item + ' ' + category)}`)
  }
  else if (category === 'special') {
    res.status(301).redirect(`${url}/items/${format(item)}`)
  }
  else if (category === 'arcane') {
    res.status(301).redirect(`${url}/`)
  }
  else if (item.includes('primed')) {
    if (!missing[item]) {
      const full = JSON.parse(await request.get(suggestions + item))

      if (full[0]) {
        missing[item] = format(full[0].name)
        res.status(301).redirect(`${url}/items/${missing[item]}/prices`)
      } else {
        res.status(301).redirect(`${url}/`)
      }
    } else {
      res.status(301).redirect(`${url}/items/${format(missing[item])}/prices`)
    }
  }
  else {
    res.status(301).redirect(`${url}/items/${format(item)}/prices`)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
