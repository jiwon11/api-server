import { Model, DataTypes } from 'sequelize';

module.exports = class User extends Model {
  static initialize(sequelize) {
    this.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        isActive: {
          type: DataTypes.BOOLEAN
        }
      },
      { sequelize }
    );
  }
  /* RELATIONSHIPS */

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
    return await this.create(args);
  }
};
