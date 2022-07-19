const gameModel = (sequelize: any, Sequelize: any) => {
  const Game = sequelize.define('game', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    boardState: {
      type: Sequelize.DataTypes.STRING(500),
      defaultValue: null
    },
    status: {
      type: Sequelize.DataTypes.STRING(100),
      defaultValue: 'new'
    }
  })
  return Game
}

export default gameModel
