import { Sequelize } from 'sequelize';
import { envs } from '../environments/environments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log('The database has been connected!...😊');
  } catch (error) {
    console.error(error);
  }
};

export const synced = async () => {
  try {
    await sequelize.sync();
    console.error('The database has been synced ok!...👌');
  } catch (error) {
    console.error(error);
  }
};
