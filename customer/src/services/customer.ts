import userModel from '../model/customer';
import logger from '../utills/logger/logger';
import CommonFunction, {
  hashPassword,
  comparePassword,
  mailTransporter
} from '../utills/comman/comman';
import {
  ICustomerAttributes,
  // ICustomerUpdateAttributes,
  ICustomerUpdatePassword,
  // ILoginCustomer,
} from 'src/utills/interface/interface';
import { ITokenDetail } from 'src/utills/interface/interface';
import jwt from 'jsonwebtoken';
const commonFun = new CommonFunction(jwt);





export default class customer {

  async createCustomerService(data: ICustomerAttributes) {
    try {
      const email: string = data.email;
      const user: object = await userModel.customer.findOne({
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
        console.log(mailDetails);
        mailTransporter.sendMail(mailDetails, function (err) {
          if (err) {
            console.log('Error:Email not Sent', err);
          } else {
            console.log('Email sent successfully');
          }
        });

        const password: string = await hashPassword(data.password);
        data.password = password;
        return await userModel.customer.create(data);
      }
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }


  async updateCustomerService(data: ICustomerAttributes, CustomerId: string) {
    try {
      const newEmail: string = data.email;
      const password: string = data.password;
      if (password) {
        return 'passwordCannotBeUpdated';
      }
      const user = await userModel.customer.findByPk(CustomerId);
      console.log(user);
      if (!user) {
        return 'userDoesNotExist';
      } else {
        const email: string = user.email;

        if (email !== newEmail) {
          const takenEmail: object = await userModel.customer.findOne({
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
      console.log(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }





  async deleteCustomerService(data) {
    try {
      const user = await userModel.customer.findByPk(data.id);

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

  async getCustomerService() {
    try {
      const user = await userModel.customer.findAll({
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

  async loginCustomerService(data: ICustomerAttributes) {
    try {
      const { email, password } = data;
      const user = await userModel.customer.findOne({
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


  async changePasswordService(data: ICustomerUpdatePassword) {

    try {
      const { oldPassword, newPassword, confirmPassword, email } = data;


      if (newPassword !== confirmPassword) {
        return 'newPassword!=ConfirmPassword';
      }
      const existingUser = await userModel.customer.findOne({
        where: {
          email: email
        }
      });
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      console.log(existingUser);
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

  async resetPasswordService(data: ICustomerUpdatePassword) {

    try {
      const { email, otp, newPassword, confirmPassword } = data;

      if (newPassword !== confirmPassword) {
        return 'newPassword!== confirmPassword';
      }
      const existingUser = await userModel.customer.findOne({
        where: {
          email
        }
      });
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      const originalOtp = await existingUser.otp;
      if (originalOtp !== otp) {
        return 'incorrectOtp';
      }
      const otpExpiration = existingUser.otpExpiration;
      if (otpExpiration < new Date(Date.now())) {
        console.log(otpExpiration, new Date(Date.now()));
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
        if (err) {
          console.log('Error:Email not Sent', err);
        } else {
          console.log('Email sent successfully');
        }
      });
      return 'passwordUpdatedSuccessfully';
    }
    catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }



  async resetPasswordEmailService(data: ICustomerAttributes) {

    try {
      const { email } = data;
      const existingUser = await userModel.customer.findOne({
        where: {
          email
        }
      });
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      const otp = Math.floor(Math.random() * 999999);
      console.log(otp);
      const otpExpiration = new Date(Date.now() + 600000);
      console.log(otpExpiration);
      const mailDetails = {
        // from: '', 
        to: existingUser?.email,
        subject: 'Request for password reset.',
        text: `You have received a one-time password (OTP) for updating your password. The otp is ${otp} and will expire in the next 10 minutes.`,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log('Error:Email not Sent', err);
        } else {
          console.log('Email sent successfully', data);
        }
      });
      existingUser.update({
        otp: otp, otpExpiration: otpExpiration
      });
      return existingUser;
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

}


// export default {
//   createCustomerService,
//   updateCustomerService,
//   deleteCustomerService,
//   getCustomerService,
//   loginCustomerService,
//   changePasswordService,
//   resetPasswordService,
//   resetPasswordEmailService
// };
