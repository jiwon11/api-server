import pkg from 'sequelize';
const { Model } = pkg;

export default class Instrument extends Model {
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
        tableName: 'INSTRUMENT_TB',
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
    this.belongsToMany(models.Teacher, {
      onDelete: 'CASCADE',
      through: 'TEACHER_INSTRUMENT',
      foreignKey: 'instrument_ID'
    });
    this.belongsToMany(models.Child, {
      onDelete: 'CASCADE',
      through: 'HOPE_INSTRUMENT',
      foreignKey: 'instrument_ID'
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
