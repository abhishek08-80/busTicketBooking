import userModel from '../model/customer';
import logger from '../utills/logger/logger';
import CommonFunction, {
  hashPassword,
  comparePassword,
  mailTransporter
} from '../utills/comman/comman';
import {
  ICustomerAttributes,
  ICustomerUpdatePassword,
} from 'src/utills/interface/interface';
import { ITokenDetail } from 'src/utills/interface/interface';
import jwt from 'jsonwebtoken';
const commonFun = new CommonFunction(jwt); // Creating an instance of CommonFunction class with JWT

import client from "../grpc"

// Defining and exporting the customer service class
export default class customer {

  // Service method to create a new customer
  async createCustomerService(data: ICustomerAttributes) {
    try {
      const email: string = data.email;
      // Checking if the user with provided email already exists
      const user: object = await userModel.customer.findOne({
        where: { email: email, isDeleted: false },
      });

      if (user) {
        return 'userAlreadyExist'; // Return message if user already exists
      } else {
        // If user doesn't exist, send a confirmation email and create the user
        const mailDetails = {
          to: email,
          subject: 'Account created.',
          text: 'Your account has been successfully created.',
        };
        console.log(mailDetails); // Logging email details
        // Sending email
        mailTransporter.sendMail(mailDetails, function (err) {
          if (err) {
            console.log('Error:Email not Sent', err);
          } else {
            console.log('Email sent successfully');
          }
        });

        // Hashing the password before saving it
        const password: string = await hashPassword(data.password);
        data.password = password;
        return await userModel.customer.create(data); // Creating the user
      }
    } catch (err) {
      console.log(err);
      logger.error(err); // Logging error
      throw new Error(err.message); // Throwing error
    }
  }

  // Service method to update customer details
  async updateCustomerService(data: ICustomerAttributes, CustomerId: string) {
    try {
      const newEmail: string = data.email;
      const password: string = data.password;
      if (password) {
        return 'passwordCannotBeUpdated'; // Cannot update password using this method
      }
      const user = await userModel.customer.findByPk(CustomerId); // Find user by primary key
      console.log(user);
      if (!user) {
        return 'userDoesNotExist'; // Return message if user doesn't exist
      } else {
        const email: string = user.email;

        if (email !== newEmail) {
          // If email is being changed, check if the new email is already taken
          const takenEmail: object = await userModel.customer.findOne({
            where: {
              'email': newEmail
            }
          });

          if (!takenEmail) {
            return await user.update(data); // Update user details
          } else {
            return 'emailAlreadyTaken'; // Return message if email is already taken
          }
        } else {
          return await user.update(data); // Update user details
        }
      }
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // Service method to delete a customer
  async deleteCustomerService(data) {
    try {
      const user = await userModel.customer.findByPk(data.id);

      if (!user) {
        return 'userDoesNotExist'; // Return message if user doesn't exist
      } else {
        // Soft delete by updating 'isDeleted' flag and adding deletion details
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

  // Service method to get customer details
  async getCustomerService() {
    try {

      console.log("I am in +++++++++++")
      const user = await userModel.customer.findAll({
        limit: 2,
      });

      // client.getUsers(null, (err, data) => {
      //   console.log("data", data)
      //   console.log("err", err)
      // });
      const id = 'e86a5047-5a35-40fa-9c4c-52c55590f492'
      client.validEmployee({ id }, (err, data) => {
        console.log("data", data) 
        console.log("err", err)
        if(data= 'userDoesNotExist'){
          return 'userDoesNotExist'
        }else{
          return data
        }
      });
      if (!user) {
        return 'userDoesNotExist'; // Return message if no user found
      } else {
        return user; // Return user details
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // Service method for customer login
  async loginCustomerService(data: ICustomerAttributes) {
    try {
      const { email, password } = data;
      const user = await userModel.customer.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return 'userDoesNotExist'; // Return message if user doesn't exist
      } else {
        const pass = await comparePassword(password, user.password);
        if (pass !== true) {
          return 'incorrectPassword'; // Return message if password is incorrect
        }
        else {
          // Generate JWT token for authenticated user
          const tokenReq: ITokenDetail = {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            role: user.role
          };
          const token: string = await commonFun.generateToken(tokenReq);
          return token; // Return JWT token
        }
      }
    }
    catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // Service method to change password
  async changePasswordService(data: ICustomerUpdatePassword) {
    try {
      const { oldPassword, newPassword, confirmPassword, email } = data;

      if (newPassword !== confirmPassword) {
        return 'newPassword!=ConfirmPassword'; // Return message if new password and confirm password do not match
      }
      const existingUser = await userModel.customer.findOne({
        where: {
          email: email
        }
      });
      if (!existingUser) {
        return 'userDoesNotExists'; // Return message if user doesn't exist
      }
      console.log(existingUser);
      const isMatch = await comparePassword(oldPassword, existingUser.password);
      if (!isMatch) {
        return 'oldPasswordIncorrect'; // Return message if old password is incorrect
      }
      const pass = await hashPassword(newPassword);
      existingUser.password = pass;
      await existingUser.update({ password: pass });

      return existingUser; // Return updated user
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


  // function for sending otp through mail service
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