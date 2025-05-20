import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const app = express()
app.use(cors())
app.use(express.json())

let db: any

async function setupDB() {
  db = await open({
    filename: './employees.db',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      telegram_id TEXT PRIMARY KEY,
      name TEXT,
      address TEXT,
      passport TEXT,
      inn TEXT,
      skills TEXT
    )
  `)
}

app.get('/api/employee', async (req, res) => {
  const { telegram_id } = req.query
  if (!telegram_id) return res.status(400).json({ error: 'Missing telegram_id' })

  const employee = await db.get('SELECT * FROM employees WHERE telegram_id = ?', telegram_id)
  if (!employee) return res.status(404).send()

  res.json({
    ...employee,
    skills: employee.skills ? employee.skills.split(',') : []
  })
})

app.get('/seed', async (_req, res) => {
  await db.run(`
    INSERT OR REPLACE INTO employees
    (telegram_id, name, address, passport, inn, skills)
    VALUES (?, ?, ?, ?, ?, ?)
  `, ['123456789', 'Иванов Иван', 'г. Москва', '1234 567890', '1234567890', 'звук,организация'])
  res.send('Seeded')
})

const port = process.env.PORT || 3000
setupDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})
