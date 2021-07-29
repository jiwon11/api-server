import pkg from 'sequelize';
import ChildModel from './child';
import DistrictModel from './district';
import LessonStyleModel from './lesson_style';
import ParentModel from './parent';
import TeacherModel from './teacher';
import UserModel from './user';
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
        },
        has_confirm: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
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

  static get getAttributes() {
    return ['ID', 'cost', 'has_confirm', 'createdAt'];
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
  static async getRequestRecommend(customRecommendId, limit = 1, offset = 0) {
    try {
      const customRecommendRecord = await this.findAll({
        logging: true,
        where: { ID: customRecommendId },
        attributes: this.getAttributes,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: ParentModel,
            attributes: ParentModel.getAttributes('included'),
            include: [
              {
                model: UserModel,
                attributes: []
              }
            ]
          },
          {
            model: ChildModel,
            attributes: ChildModel.getAttributes
          },
          {
            model: DistrictModel,
            attributes: DistrictModel.getAttributes,
            through: {
              attributes: []
            }
          },
          {
            model: LessonStyleModel,
            attributes: LessonStyleModel.getAttributes,
            through: {
              attributes: []
            }
          },
          {
            model: TeacherModel,
            attributes: TeacherModel.getAttributes('included'),
            include: [
              {
                model: UserModel,
                attributes: []
              }
            ],
            through: {
              attributes: []
            }
          }
        ]
      });
      if (typeof customRecommendId === 'object') {
        return customRecommendRecord;
      } else {
        return customRecommendRecord[0];
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
