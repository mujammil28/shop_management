const sequelize = require('../config/db');
const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

// Associations
User.hasMany(Store, { as: 'ownedStores', foreignKey: 'ownerId' });
Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

Store.hasMany(Rating, { as: 'ratings', foreignKey: 'storeId' });
Rating.belongsTo(Store, { as: 'store', foreignKey: 'storeId' });

User.hasMany(Rating, { as: 'ratings', foreignKey: 'userId' });
Rating.belongsTo(User, { as: 'user', foreignKey: 'userId' });

module.exports = { sequelize, User, Store, Rating };
