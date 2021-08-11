import pkg from 'sequelize';
const { Model } = pkg;

export default class LessonPlace extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'LESSON_PLACE_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }

  static get getAttributes() {
    return ['name'];
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    this.belongsToMany(models.Teacher, {
      onDelete: 'CASCADE',
      through: 'TEACHER_LESSON_PLACE',
      foreignKey: 'lesson_place_ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  // Create a new user
}
