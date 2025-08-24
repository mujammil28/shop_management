const Store = require('../models/Store');
const Rating = require('../models/Rating');

// List all stores with user's rating
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ include: { model: Rating, where: { userId: req.user.id }, required: false } });
    const result = stores.map(store => ({
      id: store.id,
      name: store.name,
      address: store.address,
      userRating: store.Ratings.length > 0 ? store.Ratings[0].rating : null
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit or update rating
exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    let existing = await Rating.findOne({ where: { storeId, userId: req.user.id } });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json(existing);
    }
    const newRating = await Rating.create({ storeId, userId: req.user.id, rating });
    res.status(201).json(newRating);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
