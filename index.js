const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./database')
const User = require('./models/User')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body
    const newUser = await User.create({ username, password })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route to get a user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route to update a user by id
app.put('/users/:id', async (req, res) => {
  try {
    const { username, password } = req.body
    const [updated] = await User.update(
      { username, password },
      {
        where: { id: req.params.id }
      }
    )
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id)
      res.status(200).json(updatedUser)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route to delete a user by id
app.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    })
    if (deleted) {
      res.status(204).json({ message: 'User deleted' })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Start server and sync database
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })
