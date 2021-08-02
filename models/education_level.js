import pkg from 'sequelize';
const { Model } = pkg;

export default class EducationLevel extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        course: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        school_name: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        subject: {
          type: DataTypes.STRING(20),
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
        },
        certificate_img: {
          type: DataTypes.STRING(300),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'EducationLevel',
        tableName: 'EDUCATION_LEVEL_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }

  static get getAttributes() {
    return ['course', 'school_name', 'subject', 'start_date', 'end_date', 'certificate_img'];
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
