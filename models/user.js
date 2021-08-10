import pkg from 'sequelize';
const { Model } = pkg;

export default class User extends Model {
  static initialize(sequelize, DataTypes) {
    return super.init(
      {
        ID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
          allowNull: false
        },
        phone_NO: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: null,
          allowNull: true,
          validate: {
            isIn: {
              args: [['parent', 'teacher', null]],
              msg: 'User role Must be Parent or Teacher'
            }
          }
        },
        kakao_token: {
          type: DataTypes.STRING(1000),
          allowNull: false
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        profile_img: {
          type: DataTypes.STRING,
          defaultValue: ''
        }
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'USER_TB',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        hooks: {
          beforeDestroy: async function (instance, options) {
            const parent = await instance.getParent();
            await parent.destroy();
            const teacher = await instance.getTeacher();
            await teacher.destroy();
            const children = await instance.getChilds();
            for (const child of children) {
              await child.destroy();
            }
          }
        }
      }
    );
  }

  static get getAttributes() {
    return ['phone_NO', 'kakao_token', 'profile_img'];
  }
  /* RELATIONSHIPS */

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // Using additional options like CASCADE etc for demonstration
    this.hasOne(models.Teacher, {
      onDelete: 'CASCADE',
      sourceKey: 'ID',
      foreignKey: 'user_ID'
    });
    this.hasOne(models.Parent, {
      onDelete: 'CASCADE',
      sourceKey: 'ID',
      foreignKey: 'user_ID'
    });
  }

  /* CLASS-LEVEL FUNCTIONS */
  // Create a new user
  /*
  static async create(args) {
    // logic to create a user
    // eslint-disable-next-line no-return-await
    return await this.create(args);
  }
  */
  static async getUserRole(userId) {
    // logic to create a user
    // eslint-disable-next-line no-return-await
    const userRecord = await this.findOne({
      where: {
        ID: userId
      },
      attributes: ['ID', 'phone_NO', 'role', 'kakao_token', 'profile_img']
    });
    let roleRecord;
    if (userRecord.role === 'parent') {
      roleRecord = await userRecord.getParent({ attributes: ['nickname'] });
    } else {
      roleRecord = await userRecord.getTeacher({
        attributes: ['name', 'gender', 'birthday', 'certificated_edu']
      });
    }

    return { ...userRecord.dataValues, ...roleRecord.dataValues };
  }
}
