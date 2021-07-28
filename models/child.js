import pkg from 'sequelize';
const { Model } = pkg;

export default class Child extends Model {
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
          type: DataTypes.STRING(20),
          allowNull: false
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        gender: {
          type: DataTypes.CHAR(1),
          allowNull: true
        },
        phone_NO: {
          type: DataTypes.STRING,
          allowNull: true
        },
        has_instrument: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        full_address: {
          type: DataTypes.STRING,
          allowNull: false
        },
        has_lesson_experience: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        can_read_score: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        object: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'CHILD_TB',
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
      foreignKey: 'parent_ID',
      sourceKey: 'parent_ID'
    });
    this.belongsToMany(models.Instrument, {
      onDelete: 'CASCADE',
      through: 'HOPE_INSTRUMENT',
      foreignKey: 'child_ID'
    });
    this.hasMany(models.CustomRecommend, {
      onDelete: 'CASCADE',
      foreignKey: 'child_ID',
      sourceKey: 'ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  // Create a new user
}
