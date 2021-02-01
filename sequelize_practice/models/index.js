// Model을 정의하고 관계를 설정하는 부분
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// 환경변수, 실제 배포할 때는 'production'으로 바꿔야 한다.
const env = process.env.NODE_ENV || 'development';
// config
const config = require(__dirname + '/../config/config.json')[env];
// db 객체 생성
const db = {};

// sequelize 객체에 config 파일에 있는 설정들을 넣어준다.
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db 객체에 sequelize 패키지와 객체를 넣고 모듈로 사용
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Comment = require('./comments')(sequelize, Sequelize);

// 관계 설정 User-Comment = 1:N 관계
// db.User.hasMany(db.Comment, {foreignKey: 'commentIdx', sourceKey: 'id'});
// db.comments.belongsTo(db.User, {foreignKey: 'commentIdx', targetKey: 'id'});

// 1:1 관계) hasOne, belongsTo
// 1:N 관계) hasMany, belongsTo
// N:M 관계) belongsToMany

module.exports = db;
