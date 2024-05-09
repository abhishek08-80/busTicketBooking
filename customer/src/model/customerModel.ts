import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import { Role } from '../utills/enums/enum';
import {customer} from '../utills/interface/interface';


customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    Dob: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phoneNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      defaultValue: Role.Customer
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        max: 999999 // Maximum value for OTP
      }
    },
    otpExpiration: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'customer',
  },
);

sequelize
  .sync()
  .then(() => {
    console.log('customer table linked successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

export default { customer };
