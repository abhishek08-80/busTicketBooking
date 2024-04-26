import db from '../model/bus';
import logger from '../utills/logger/logger';
import {
  IBusAttributes,
} from 'src/utills/interface/interface';





export default class bus {

  async createBusService(data: IBusAttributes) {
    try {
      // const employeeId: string = data.employeeId;
      // const user: object = await db.bus.findOne({
      //   where: { email: email, isDeleted: false },
      // });

      // if (user) {
      //   return 'userAlreadyExist';
      // } else {

      return await db.bus.create(data);
      // }
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }


  async updateBusService(data: IBusAttributes, CustomerId: string) {
    try {

      const user = await db.bus.findByPk(CustomerId);
      // console.log(user);
      // if (!user) {
      //   return 'userDoesNotExist';
      // } else {
      //   const email: string = user.email;

      //   if (email !== newEmail) {
      //     const takenEmail: object = await db.bus.findOne({
      //       where: {
      //         'email': newEmail
      //       }
      //     });

      //     if (!takenEmail) {
      //       return await user.update(data);
      //     } else {
      //       return 'emailAlreadyTaken';
      //     }
      //   } else {
      return await user.update(data);
      //   }
      // }
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }





  async deleteBusService(data) {
    try {
      const user = await db.bus.findByPk(data.id);

      if (!user) {
        return 'userDoesNotExist';
      } else {
        return await user.update({
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: data.id,
        });
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  async getBusService() {
    try {
      const user = await db.bus.findAll({
        limit: 2,
      });
      if (!user) {
        return 'userDoesNotExist';
      } else {
        return user;
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }


}

