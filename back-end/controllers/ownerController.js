const Store = require('../models/Store');
const Rating = require('../models/Rating');

// List ratings for owner's store
exports.getStoreRatings = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: Rating
    });
    if (!store) return res.status(404).json({ message: 'Store not found' });

    const avgRating = store.Ratings.length > 0 ? (store.Ratings.reduce((a,b)=>a+b.rating,0)/store.Ratings.length).toFixed(2) : 0;
    res.json({ storeId: store.id, storeName: store.name, avgRating, ratings: store.Ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
