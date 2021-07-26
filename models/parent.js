import pkg from 'sequelize';
const { Model } = pkg;

export default class Parent extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
          allowNull: false
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize,
        modelName: 'Parent',
        tableName: 'PARENT_TB',
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
    this.belongsTo(models.User, {
      foreignKey: 'user_ID',
      targetKey: 'ID'
    });
    this.hasMany(models.Child, {
      onDelete: 'CASCADE',
      foreignKey: 'parent_ID',
      sourceKey: 'ID'
    });
    this.belongsToMany(models.LessonStyle, {
      onDelete: 'CASCADE',
      through: 'HOPE_LESSON_STYLE',
      foreignKey: 'parent_ID'
    });
    this.belongsToMany(models.District, {
      onDelete: 'CASCADE',
      through: 'RESIDENCE',
      foreignKey: 'parent_ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */
}
