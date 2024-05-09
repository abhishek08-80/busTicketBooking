import userModel from '../model/employeeModel';
import logger from '../utills/logger/logger';
import CommonFunction, {
  hashPassword,
  comparePassword,
  mailTransporter
} from '../utills/comman/comman';
import {
  IEmployeeUpdatePassword,
  IEmployeesAttributes,
  ITokenDetail
} from '../utills/interface/interface';
import jwt from 'jsonwebtoken';
const commonFun = new CommonFunction(jwt);



export default class employee {

  // function for adding new employee
  public static async createEmployeeService(data: IEmployeesAttributes) {
    try {
      const email: string = data.email;
      const user = await userModel.employees.findOne({
        where: { email: email, isDeleted: false },
      });

      if (user) {
        return 'userAlreadyExist';
      } else {
        const mailDetails = {
          to: email,
          subject: 'Account created.',
          text: 'Your account has been successfully created.',
        };
        mailTransporter.sendMail(mailDetails, function (err) {
        });

        const password: string = await hashPassword(data.password);
        data.password = password;
        return await userModel.employees.create(data);
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // function for updating employee service except for password
  public static async updateEmployeeService(data: IEmployeesAttributes, CustomerId: string) {
    try {
      const newEmail: string = data.email;
      const password: string = data.password;
      if (password) {
        return 'passwordCannotBeUpdated';
      }
      const user = await userModel.employees.findByPk(CustomerId);
      if (!user) {
        return 'userDoesNotExist';
      } else {
        const email: string = user.email;

        if (email !== newEmail) {
          const takenEmail = await userModel.employees.findOne({
            where: {
              'email': newEmail
            }
          });

          if (!takenEmail) {
            return await user.update(data);
          } else {
            return 'emailAlreadyTaken';
          }
        } else {
          return await user.update(data);
        }
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }




  // delete employee service
  public static async deleteEmployeeService(data) {
    try {
      const user = await userModel.employees.findByPk(data.id);

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

  // function for getting all the employees
  public static async getAllService() {
    try {


      
      const user = await userModel.employees.findAll({
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

  public static async getEmployeeByIdService(data:string) {
    try {
      const user = await userModel.employees.findByPk(data);
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

  public static async loginEmployeeService(data: IEmployeesAttributes) {
    try {
      const { email, password } = data;
      const user = await userModel.employees.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return 'userDoesNotExist';
      } else {
        const pass = await comparePassword(password, user.password);
        if (pass !== true) {
          return 'incorrectPassword';
        }
        else {
          const tokenReq: ITokenDetail = {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            role: user.role
          };
          const token: string = await commonFun.generateToken(tokenReq);
          return token;
        }
      }
    }
    catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // function for changing password
  public static async changePasswordService(data: IEmployeeUpdatePassword, customerId: string) {

    try {
      const { oldPassword, newPassword, confirmPassword } = data;


      if (newPassword !== confirmPassword) {
        return 'newPassword!=ConfirmPassword';
      }
      const existingUser = await userModel.employees.findByPk(customerId);
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      const isMatch = await comparePassword(oldPassword, existingUser.password);
      if (!isMatch) {
        return 'oldPasswordIncorrect';
      }
      const pass = await hashPassword(newPassword);
      existingUser.password = pass;
      await existingUser.update({ password: pass });

      return existingUser;
    }
    catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // function for reset password
  public static async resetPasswordService(data: IEmployeeUpdatePassword) {

    try {
      const { email, otp, newPassword, confirmPassword } = data;

      if (newPassword !== confirmPassword) {
        return 'newPassword!== confirmPassword';
      }
      const existingUser = await userModel.employees.findOne({
        where: {
          email
        }
      });
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      const originalOtp = existingUser.otp;
      if (originalOtp !== otp) {
        return 'incorrectOtp';
      }
      const otpExpiration = existingUser.otpExpiration;
      if (otpExpiration < new Date(Date.now())) {
        return 'otpExpired';
      }

      const pass = await hashPassword(newPassword);
      await existingUser.update({ otp: undefined, password: pass, otpExpiration: undefined });

      const mailDetails = {
        // from: '',
        to: email,
        subject: 'Password Changed',
        text: 'Your account password updated successfully',
      };
      mailTransporter.sendMail(mailDetails, function (err) {
      });
      return 'passwordUpdatedSuccessfully';
    }
    catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // function for sending otp through mail for employee
  public static async resetPasswordEmailService(data: IEmployeesAttributes) {

    try {
      const { email } = data;
      const existingUser = await userModel.employees.findOne({
        where: {
          email
        }
      });
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      const otp = Math.floor(Math.random() * 999999);
      const otpExpiration = new Date(Date.now() + 600000);
      const mailDetails = {
        // from: '', 
        to: existingUser?.email,
        subject: 'Request for password reset.',
        text: `You have received a one-time password (OTP) for updating your password. The otp is ${otp} and will expire in the next 10 minutes.`,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
      });
      existingUser.update({ otp: otp, otpExpiration: otpExpiration });
      return existingUser;
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }
}
