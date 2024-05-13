import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';
import { Role } from '../utills/enums/enum';
import {Feedback} from '../utills/interface/interface';

interface FeedbackAttributes {
  id: string;
  userId: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

Feedback.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
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
  }
},
  {
    sequelize,
    tableName: 'feedbacks',
    timestamps: true,
    underscored: true,
  }
);

export default Feedback;
