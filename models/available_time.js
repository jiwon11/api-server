import pkg from 'sequelize';
const { Model } = pkg;

export default class AvailableTime extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        day: {
          type: DataTypes.STRING(5),
          allowNull: false,
          validate: {
            isIn: {
              args: [['Sun', 'Mon', 'Tus', 'Wed', 'Thr', 'Fri', 'Sat']],
              msg: "Available Time's Must be Sun - Sat"
            }
          }
        },
        start_time: {
          type: DataTypes.TIME,
          allowNull: false
        },
        end_time: {
          type: DataTypes.TIME,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'AvailableTime',
        tableName: 'AVAILABLE_TIME_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    this.belongsTo(models.Teacher, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      targetKey: 'ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  // Create a new user
  static async create(args) {
    // logic to create a user
    // eslint-disable-next-line no-return-await
    return await this.create(args);
  }
}
