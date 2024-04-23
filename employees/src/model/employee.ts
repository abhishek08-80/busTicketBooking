import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/dbConfig'
import { IEmployeesAttributes } from '../utills/interface/interface'
import { Role } from '../utills/enums/enum'

class employees extends Model<IEmployeesAttributes> implements IEmployeesAttributes {
  public id!: string
  public email!: string
  public password!: string
  public firstName!: string
  public lastName?: string
  public address?: string
  public Dob?: Date
  public phoneNo!: number
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
  public deletedBy?: string
  public isDeleted?: boolean
  public role?: Role
  public otp?: number
  public otpExpiration?: Date
}

employees.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
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
      defaultValue: Role.Staff
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    otpExpiration: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'employees',
  },
)

sequelize
  .sync()
  .then(() => {
    console.log('employees table linked successfully!')
  })
  .catch((error) => {
    console.error('Unable to create table: ', error)
  })

export default { employees }
