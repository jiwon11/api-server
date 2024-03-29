import pkg from 'sequelize';
const { Model } = pkg;

export default class Account extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
          allowNull: false
        },
        bank_name: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        number: {
          type: DataTypes.STRING(200),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Account',
        tableName: 'ACCOUNT_TB',
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
}
