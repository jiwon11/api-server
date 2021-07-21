import pkg from 'sequelize';
const { Model } = pkg;

export default class Teacher extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
          allowNull: false
        },
        phone_NO: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false
        },
        kakao_token: {
          type: DataTypes.STRING(1000),
          allowNull: false
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        profile_img: {
          type: DataTypes.STRING,
          defaultValue: ''
        }
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'USER_TB',
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
    // Can also simply do Task.belongsTo(models.User);
    /*
    this.hasMany(models.Post, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    */
    this.hasOne(models.Teacher, {
      onDelete: 'CASCADE',
      targetKey: 'ID',
      foreignKey: 'user_ID'
    });
    this.hasOne(models.Parent, {
      onDelete: 'CASCADE',
      targetKey: 'ID',
      foreignKey: 'user_ID'
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
