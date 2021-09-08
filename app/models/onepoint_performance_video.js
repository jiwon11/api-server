import pkg from 'sequelize';
const { Model, Op } = pkg;

export default class OnepointPerformanceVideo extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        mime_type: {
          type: DataTypes.STRING(40),
          allowNull: false
        },
        url: {
          type: DataTypes.STRING(150),
          allowNull: false
        },
        width: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        height: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        size: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'OnepointPerformanceVideo',
        tableName: 'ONEPOINT_PERFORMANCE_VIDEO_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }
  static get getAttributes() {
    return ['ID', 'url'];
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    this.belongsTo(models.Onepoint, {
      onDelete: 'CASCADE',
      foreignKey: 'onepoint_ID',
      targetKey: 'ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  static async getOnlyImgs(teacherId) {
    try {
      return this.findAll({
        where: {
          teacher_ID: teacherId,
          name: {
            [Op.not]: 'performanceVideo'
          }
        },
        attributes: CoverImg.getAttributes
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
