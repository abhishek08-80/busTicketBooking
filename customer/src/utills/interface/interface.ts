import { Role } from '../enums/enum'

export interface ICustomerAttributes {
  id?: string
  firstName: string
  lastName?: string
  address?: string
  Dob?: Date
  phoneNo?: number
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  deletedBy?: string
  isDeleted?: boolean
  role?: Role
  otp?: number
  otpExpiration?: Date
}

export interface ICustomerUpdatePassword extends ICustomerAttributes {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

// export interface ICustomerRequest extends ICustomerAttributes {
//   body: ICustomerAttributes
// }


// export interface ICustomerUpdateAttributes {
//   id?: string
//   firstName?: string
//   lastName?: string
//   address?: string
//   Dob?: Date
//   phoneNo?: number
//   email?: string
//   password?: string
//   createdAt?: Date
//   updatedAt?: Date
//   deletedAt?: Date
//   deletedBy?: string
//   isDeleted?: boolean
// }

// export interface ILoginCustomer {
//   email: string
//   password: string
// }

// export interface IDeleteCustomer {
//   id: string
// }


// export interface Decode {
//   _id: string
//   email: string
//   role: string
// }


export interface ITokenDetail {
  id: string,
  firstName: string,
  email: string,
  role: Role
}



// export interface Requests {
//   _id: string
//   email: string
//   role: string
// }
