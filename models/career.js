import pkg from 'sequelize';
const { Model } = pkg;

export default class Career extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        category: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(200),
          allowNull: false
        },
        start_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: sequelize.NOW
        },
        end_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: sequelize.NOW
        }
      },
      {
        sequelize,
        modelName: 'Career',
        tableName: 'CAREER_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }

  static get getAttributes() {
    return ['category', 'description', 'start_date', 'end_date'];
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
