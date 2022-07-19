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
  if (req.method === 'GET') {
    const gameId = req.query.gameId
    console.log('finding game for: ', gameId)
    const game = await Game.findOne({
      where: {
        id: gameId
      }
    })
    if (game && game.dataValues) {
      res.status(200).json({
        ...game.dataValues
      })
    } else {
      res.status(404).json({ message: 'Couldnt find game' })
    }
  } else {
    res.status(400).json({ message: 'Invalid method type' })
  }
}
