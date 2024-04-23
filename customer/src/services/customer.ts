import userModel from '../model/customer'
import logger from '../utills/logger/logger'
import CommonFunction, {
  hashPassword,
  comparePassword
} from '../utills/comman/comman'
import {
  ICustomerAttributes,
  // ICustomerUpdateAttributes,
  ICustomerUpdatePassword,
  // ILoginCustomer,
} from 'src/utills/interface/interface'
import { mailTransporter } from '../email/email'
import { ITokenDetail } from 'src/utills/interface/interface'
import jwt from 'jsonwebtoken'
const commonFun = new CommonFunction(jwt);






async function createCustomerService(data: ICustomerAttributes) {
  try {
    const email: string = data.email
    const user: object = await userModel.customer.findOne({
      where: { email: email, isDeleted: false },
    })

    if (user) {
      return 'userAlreadyExist'
    } else {
      const mailDetails = {
        to: email,
        subject: 'Account created.',
        text: 'Your account has been successfully created.',
      }
      console.log(mailDetails)
      mailTransporter.sendMail(mailDetails, function (err) {
        if (err) {
          console.log('Error:Email not Sent', err)
        } else {
          console.log('Email sent successfully')
        }
      })

      const password: string = await hashPassword(data.password)
      data.password = password
      return await userModel.customer.create(data)
    }
  } catch (err) {
    console.log(err)
    logger.error(err)
    throw new Error(err.message)
  }
}

// const libraryEmail = await models.libraryModel.findOne({'email': email, '_id':{$ne:libraryId}});

// const takenEmail = await userModel.customer.findOne({where: {email:[Op.ne] :data.email}})
// if(takenEmail){
//   return 'emailAlreadyTaken'

// where: {
//   email: {
//     [sequelize.Op.notIn]: data.email
//   }

// }

// async function updateCustomerService(data: any, CustomerId: string) {
//   try {
//     const user = await userModel.customer.findByPk(CustomerId)

//     if (!user) {
//       return 'userDoesNotExist'
//     } else {
//       const email = data.email

//       const takenEmail = await userModel.customer.findOne({
//         where: {
//           email: {
//             [Op.ne]: CustomerId, // Exclude the current user's email
//             // [Op.ne]: email // Also exclude the email being updated to prevent self-match
//           },
//         },
//       })
//       console.log('vsggsgd', takenEmail, 'asdfgh')
//       if (!takenEmail) {
//         if (data.password) {
//           const password = await hashPassword(data.password)
//           data.password = password
//         }
//         return await user.update(data)
//       } else {
//         return 'emailAlreadyTaken'
//       }
//     }
//   } catch (err: any) {
//     console.log(err)
//     logger.error(err)
//     throw new Error(err.message)
//   }
// }


async function updateCustomerService(data: ICustomerAttributes, CustomerId: string) {
  try {
    const newEmail: string = data.email
    const password: string = data.password
    if (password) {
      return 'passwordCannotBeUpdated'
    }
    const user = await userModel.customer.findByPk(CustomerId)
    console.log(user)
    if (!user) {
      return 'userDoesNotExist'
    } else {
      const email: string = user.email

      if (email !== newEmail) {
        const takenEmail: object = await userModel.customer.findOne({
          where: {
            'email': newEmail
          }
        })

        if (!takenEmail) {
          return await user.update(data)
        } else {
          return 'emailAlreadyTaken'
        }
      } else {
        // if (data.password) {
        //   const password = await hashPassword(data.password)
        //   data.password = password
        // }
        return await user.update(data)
      }
    }
  } catch (err) {
    console.log(err)
    logger.error(err)
    throw new Error(err.message)
  }
}





async function deleteCustomerService(data) {
  try {
    const user = await userModel.customer.findByPk(data.id)

    if (!user) {
      return 'userDoesNotExist'
    } else {
      return await user.update({
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: data.id,
      })
    }
  } catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}

async function getCustomerService() {
  try {
    const user = await userModel.customer.findAll({
      limit: 2,
    })
    if (!user) {
      return 'userDoesNotExist'
    } else {
      return user
    }
  } catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}

async function loginCustomerService(data: ICustomerAttributes) {
  try {
    const { email, password } = data
    const user = await userModel.customer.findOne({
      where: {
        email: email,
      },
    })
    if (!user) {
      return 'userDoesNotExist' 
    } else {
      const pass = await comparePassword(password, user.password)
      if (pass !== true) {
        return 'incorrectPassword'
      } 
      else {
        const tokenReq: ITokenDetail = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          role: user.role
        }
        const token: string = await commonFun.generateToken(tokenReq)
        return token
      }
    }
  }
  catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}


async function changePasswordService(data: ICustomerUpdatePassword, customerId: string) {

  try {
    const { oldPassword, newPassword, confirmPassword } = data;


    if (newPassword !== confirmPassword) {
      return 'newPassword!=ConfirmPassword'
    }
    const existingUser = await userModel.customer.findByPk(customerId);
    if (!existingUser) {
      return 'userDoesNotExists'
    }
    console.log(existingUser)
    const isMatch = await comparePassword(oldPassword, existingUser.password);
    if (!isMatch) {
      return 'oldPasswordIncorrect'
    }
    const pass = await hashPassword(newPassword)
    existingUser.password = pass
    await existingUser.update({password:pass});

    return existingUser
  }
  catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}

async function resetPasswordService(data: ICustomerUpdatePassword) {

  try {
    const { email, otp, newPassword, confirmPassword } = data; 

    if (newPassword !== confirmPassword) {
      return 'newPassword!== confirmPassword'
    }
    const existingUser = await userModel.customer.findOne({
      where: {
        email
      }
    });
    if (!existingUser) {
      return 'userDoesNotExists'
    }
    const originalOtp = await existingUser.otp
    if (originalOtp !== otp) {
      return 'incorrectOtp'
    }
    const otpExpiration = existingUser.otpExpiration
    if (otpExpiration < new Date(Date.now())) {
      console.log(otpExpiration, new Date(Date.now()))
      return 'otpExpired'
    }
    //const password: string = await hashPassword(data.password)
    // data.newPassword = password
    const pass = await hashPassword(newPassword)
    // existingUser.password = pass
    // existingUser.otp = undefined
    // existingUser.otpExpiration = undefined
    await existingUser.update({ otp: otp, password: pass, otpExpiration: otpExpiration});
    console.log('ok', existingUser, 'ok')

    const mailDetails = {
      // from: '',
      to: email,
      subject: 'Password Changed',
      text: 'Your account password updated successfully',
    }
    console.log(mailDetails)
    mailTransporter.sendMail(mailDetails, function (err) {
      if (err) {
        console.log('Error:Email not Sent', err)
      } else {
        console.log('Email sent successfully');
      }
    });
    return 'passwordUpdatedSuccessfully';
  }
  catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}



async function resetPasswordEmailService(data: ICustomerAttributes) {

  try {
    const { email } = data;
    const existingUser = await userModel.customer.findOne({
      where: {
        email
      }
    });
    if (!existingUser) {
      return 'userDoesNotExists'
    }
    const otp = Math.floor(Math.random() * 999999)
    console.log(otp)
    const otpExpiration = new Date(Date.now() + 600000);
    console.log(otpExpiration)
    const mailDetails = {
      // from: '', 
      to: existingUser?.email,
      subject: 'Request for password reset.',
      text: `You have received a one-time password (OTP) for updating your password. The otp is ${otp} and will expire in the next 10 minutes.`,
    }
    console.log(mailDetails)
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error:Email not Sent', err)
      } else {
        console.log('Email sent successfully', data);
      }
    });
    console.log(otpExpiration)
    existingUser.otp = otp
    existingUser.otpExpiration = otpExpiration
    console.log("here", existingUser, "here")
    // await existingUser.update({
    //   // otp:otp,
    //   otpExpiration:otpExpiration
    // });

    // return await userModel.customer.update(
    //   { otp: otp , otpExpiration:otpExpiration },
    //   { where: { email: data.email } }
    // )
    existingUser.save()
    return existingUser;
  } catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}




export default {
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
  getCustomerService,
  loginCustomerService,
  changePasswordService,
  resetPasswordService,
  resetPasswordEmailService
}
