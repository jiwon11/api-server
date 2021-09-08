import pkg from 'sequelize';
const { Model } = pkg;

export default class Onepoint extends Model {
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
          type: DataTypes.STRING(20),
          allowNull: false
        },
        question: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        class: {
          type: DataTypes.STRING(20),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Onepoint',
        tableName: 'ONEPOINT_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }

  static get getAttributes() {
    return ['ID', 'phone_NO', 'question', 'class'];
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    this.hasMany(models.OnepointPerformanceVideo, {
      onDelete: 'CASCADE',
      foreignKey: 'onepoint_ID',
      sourceKey: 'ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  // Create a new user
}
