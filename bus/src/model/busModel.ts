import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import {bus} from '../utills/interface/interface';
import {places} from '../utills/enums/enum';

bus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    from: {
      type: DataTypes.ENUM,
      values: Object.values(places)
    },
    to: {
      type: DataTypes.ENUM,
      values: Object.values(places)
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    },
    isDeleted: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    
  },
  {
    sequelize,
    modelName: 'bus',
  },
);

sequelize
  .sync()
  .then(() => {
    console.log('bus table linked successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

export default { bus };
