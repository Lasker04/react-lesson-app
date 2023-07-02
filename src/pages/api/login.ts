import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type SuccessResponse = {
  status: string
  name: string
}

type ErrorResponse = {
  status: string
}

type Credentials = {
  username: string
  password: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  const { method } = req

  switch (method) {
    case 'POST':
      const { username, password } = req.body

      const users: Credentials[] = JSON.parse(
        fs.readFileSync(path.resolve('./src/dummyData/credentials.json'), 'utf-8'),
      )
      const user = users.find((user) => user.username === username)

      if (username === user?.username && password === user?.password) {
        return res.status(200).json({ status: 'Logged in', name: user?.username })
      }

      return res.status(400).json({ status: 'Invalid credentials' })

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// curl -X POST -H "Content-Type: application/json"  http://localhost:3000/api/login -d '{"username":"dummy","password":"password"}'
