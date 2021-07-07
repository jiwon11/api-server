import pkg from 'sequelize';

const { Model, DataTypes } = pkg;
export default class NotificationConfig extends Model {
  static initialize(sequelize) {
    this.init(
      {
        lesson: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        inquiry: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        event: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      },
      {
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      },
      { sequelize }
    );
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    /*
    this.hasMany(models.Post, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    */
  }

  /* CLASS-LEVEL FUNCTIONS */

  // Create a new user
  static async create(args) {
    // logic to create a user
    // eslint-disable-next-line no-return-await
    return await this.create(args);
  }
}
