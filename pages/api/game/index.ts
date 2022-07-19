// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../model'

db.sequelize.sync()
const Game = db.games

type Data = {
  game_id: string
}
type Error = {
  message: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === 'POST') {
    const newGame = await Game.create()
    res.status(201).json({ game_id: newGame.id })
  } else {
    res.status(400).json({ message: 'invalid request method' })
  }
}
