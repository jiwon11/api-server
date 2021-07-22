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
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        gender: {
          type: DataTypes.CHAR(1),
          allowNull: true
        },
        birthday: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: sequelize.NOW
        },
        introduction: {
          type: DataTypes.TEXT,
          allowNull: false,
          defaultValue: ''
        },
        certificated_edu: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        can_rental: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        sequelize,
        modelName: 'Teacher',
        tableName: 'TEACHER_TB',
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
    this.hasMany(models.CoverImg, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.hasMany(models.EducationLevel, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.hasMany(models.Career, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.hasMany(models.Account, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.hasMany(models.LessonPlace, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.hasMany(models.ForeignLanguage, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.hasMany(models.AvailableTime, {
      onDelete: 'CASCADE',
      foreignKey: 'teacher_ID',
      sourceKey: 'ID'
    });
    this.belongsToMany(models.LessonStyle, {
      onDelete: 'CASCADE',
      through: 'TEACHER_LESSON_STYLE',
      foreignKey: 'teacher_ID'
    });
    this.belongsToMany(models.District, {
      onDelete: 'CASCADE',
      through: 'HOPE_LESSON_DISTRICT',
      foreignKey: 'teacher_ID'
    });
    this.belongsToMany(models.Instrument, {
      onDelete: 'CASCADE',
      through: 'TEACHER_INSTRUMENT',
      foreignKey: 'teacher_ID'
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
