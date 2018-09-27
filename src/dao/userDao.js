import sequelize from '../utils/sequelize';

const User = sequelize.import('../models/user');
// const log = getLogger('dao/orderDao');

async function isUserExist(username, password) {
  const result = await User.findAll({
    where: { username, password },
    attributes: ['id', 'username', 'password'],
    raw: true,
    logging: sql => console.log('[isUserExist Sql] - ', sql),
  });
  return result;
}

export default{
  isUserExist,
};
