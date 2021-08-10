import pkg from 'sequelize';
const { Model } = pkg;

export default class District extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        si_do: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        si_gun_gu: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        eup_myeon_dong: {
          type: DataTypes.STRING(50),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'District',
        tableName: 'DISTRICT_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  }
  static get getAttributes() {
    return ['ID', 'si_do', 'si_gun_gu', 'eup_myeon_dong', [pkg.fn('CONCAT', pkg.col('si_do'), ' ', pkg.col('si_gun_gu'), ' ', pkg.col('eup_myeon_dong')), 'full_address']];
  }

  static searchQuery(query) {
    return pkg.where(pkg.fn('CONCAT', pkg.col('si_do'), ' ', pkg.col('si_gun_gu'), ' ', pkg.col('eup_myeon_dong')), {
      [pkg.Op.like]: `%${query}%`
    });
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    this.belongsToMany(models.Teacher, {
      onDelete: 'CASCADE',
      through: 'HOPE_LESSON_DISTRICT',
      foreignKey: 'district_ID'
    });
    this.belongsToMany(models.Parent, {
      onDelete: 'CASCADE',
      through: 'RESIDENCE',
      foreignKey: 'district_ID'
    });
    this.belongsToMany(models.CustomRecommend, {
      onDelete: 'CASCADE',
      through: 'HOPE_RECOMMENDED_DISTRICT_TB',
      foreignKey: 'district_ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */

  static async searchAll(query, limit, offset) {
    try {
      return this.findAll({
        where: this.searchQuery(query),
        attributes: this.getAttributes,
        limit: limit,
        offset: offset
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
