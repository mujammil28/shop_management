const Store = require('../models/Store'); // make sure you have a Store model

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
