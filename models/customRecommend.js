import pkg from 'sequelize';
import ChildModel from './child';
import DistrictModel from './district';
import LessonStyleModel from './lesson_style';
import ParentModel from './parent';
import TeacherModel from './teacher';
const { Model } = pkg;

export default class CustomRecommend extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        cost: {
          type: DataTypes.STRING(20),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'CustomRecommend',
        tableName: 'CUSTOM_RECOMMEND_TB',
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
    this.belongsTo(models.Parent, {
      onDelete: 'CASCADE',
      foreignKey: 'parent_ID'
    });
    this.belongsTo(models.Child, {
      onDelete: 'CASCADE',
      foreignKey: 'child_ID'
    });
    this.belongsToMany(models.Teacher, {
      onDelete: 'CASCADE',
      through: 'RECOMMENDED_TEACHER_TB',
      foreignKey: 'recommend_request_ID'
    });
    this.belongsToMany(models.District, {
      onDelete: 'CASCADE',
      through: 'HOPE_RECOMMENDED_DISTRICT_TB',
      foreignKey: 'recommend_request_ID'
    });
    this.belongsToMany(models.LessonStyle, {
      onDelete: 'CASCADE',
      through: 'HOPE_RECOMMENDED_STYLE_TB',
      foreignKey: 'recommend_request_ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  // Create a new user
  static async getRequestRecommend(customRecommendId) {
    const customRecommendRecord = await this.findOne({
      where: { ID: customRecommendId },
      attributes: { exclude: ['updatedAt', 'deletedAt'] },
      include: [
        {
          model: ParentModel,
          attributes: { exclude: ['updatedAt', 'deletedAt'] }
        },
        {
          model: ChildModel,
          attributes: { exclude: ['updatedAt', 'deletedAt'] }
        },
        {
          model: DistrictModel,
          attributes: ['si_do', 'si_gun_gu', 'eup_myeon_dong'],
          through: {
            attributes: []
          }
        },
        {
          model: LessonStyleModel,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
        {
          model: TeacherModel,
          attributes: { exclude: ['updatedAt', 'deletedAt'] },
          through: {
            attributes: []
          }
        }
      ]
    });
    return customRecommendRecord;
  }
}
