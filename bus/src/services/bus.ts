import db from '../model/bus';
import logger from '../utills/logger/logger';
import {
  IBusAttributes,
} from 'src/utills/interface/interface';
import client from "../grpc"





export default class bus {

  // public static async createBusService(busdata: IBusAttributes) {
  //   try {
  //     // const id = 'e86a5047-5a35-40fa-9c4c-52c55590f492'
  //     const employeeId = busdata.employeeId
  //   const employeeData =  await client.validEmployee({id: employeeId }, (err, data) => {
  //       console.log("data", data)
  //       console.log("err", err)
  //       if (employeeData == null) { 
  //         console.log('error', err) 
  //       } else {
  //         console.log("emp data", data)
  //       }
  //     });  
  //     // return 'employeeDoesNotExist' 
  //     return await db.bus.create(busdata);
  //   } catch (err) {
  //     console.log(err);
  //     logger.error(err);
  //     throw new Error(err.message);
  //   }
  // }

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
      console.log(user);
      if (!user) {
        return 'busDoesNotExist';
      } else {
          return await user.update(data);
        }
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }





  public static async deleteBusService(data) {
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

  public static async getBusService() {
    try {
      const bus = await db.bus.findAll({
        limit: 2,
      });
      if (!bus) {
        return 'userDoesNotExist';
      } else {
        return bus;
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }


}

