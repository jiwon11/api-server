import pkg from 'sequelize';
const { Model } = pkg;

export default class Curriculum extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        numberOfTimes: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        canExhibit: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        target: {
          type: DataTypes.STRING,
          allowNull: true
        },
        textbook: {
          type: DataTypes.STRING,
          allowNull: false
        },
        totalDescription: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        place: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isUntact: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        sequelize,
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
