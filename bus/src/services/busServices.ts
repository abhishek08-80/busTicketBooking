import db from '../model/busModel';
import logger from '../utills/logger/logger';
import {
  IBusAttributes,
} from 'src/utills/interface/interface';
import client from "../grpc/clientIndex"





export default class bus {

  public static async createBusService(busdata: IBusAttributes) {
    try {
      const employeeId = busdata.employeeId;

      // Call validEmployee and wait for the result
      const employeeData = await new Promise((resolve, reject) => {
        client.validEmployee({ id: employeeId }, (err, data) => {
          if (err) {
            console.log(data, err)
            reject(err);
          } else {
            console.log(data.firstName)
            resolve(data);
          }
        });
      });

      // Check if employeeData is null
      if (!employeeData) {
        return 'employeeDoesNotExist'
      }

      // If employee exists, create the bus
      return await db.bus.create(busdata);
    } catch (err) {
      console.error(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }



  public static async updateBusService(data: IBusAttributes, busId: string) {
    try {

      const user = await db.bus.findByPk(busId);
      if (!user) {
        return 'busDoesNotExist';
      } else {
        return await user.update(data);
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }





  public static async deleteBusService(data) {
    try {
      const user = await db.bus.findByPk(data.id);

      if (!user) {
        return 'busDoesNotExist';
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

  public static async getAllBusService() {
    try {
      const bus = await db.bus.findAll({
        limit: 2,
      });
      if (!bus) {
        return 'busDoesNotExist';
      } else {
        return bus;
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }


  public static async getBusByIdService(busId: string) {
    try {
      const bus = await db.bus.findByPk(busId);
      if (!bus) {
        return 'busDoesNotExist';
      } else {
        return bus;
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

}

