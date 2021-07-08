import pkg from 'sequelize';
const { Model } = pkg;

export default class Teacher extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.CHAR(36),
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
          allowNull: false
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        fcmToken: {
          type: DataTypes.STRING(1000),
          allowNull: true
        },
        birthday: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        gender: {
          type: DataTypes.CHAR(1),
          allowNull: true
        },
        introduction: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        recommendNum: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        canUntact: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        canRentalInstrument: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        certificatedEdu: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        certifiedPhoneNumber: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        profileImg: {
          type: DataTypes.STRING,
          defaultValue: ''
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
