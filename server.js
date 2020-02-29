require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const cors = require('cors')

const db = require('./db')
const shortUrl = require('./shortUrl.model')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/', async (req, res) => {
    await shortUrl.create({ fullUrl: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:id', async (req, res) => {
    const foundUrl = await shortUrl.findOne({ shortUrl: req.params.id })
    if (foundUrl == null) return res.status(404).send('Not Found!')
    foundUrl.clicks++
    foundUrl.save()
    res.redirect(foundUrl.fullUrl)
})

app.listen(port, () => console.log(`Listening on Port ${port}...`))