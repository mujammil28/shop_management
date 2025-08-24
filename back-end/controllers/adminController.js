const { User, Store, Rating } = require('../models');  // ✅ important
const { Op } = require('sequelize');

// Get dashboard stats
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      users: totalUsers,
      stores: totalStores,
      ratings: totalRatings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all users with filtering and sorting
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'address', 'role'],
      include: [
        {
          model: Store,
          as: 'ownedStores', // ✅ must match association
          attributes: ['id', 'name'],
        },
      ],
    });

    res.json(users);
  } catch (err) {
    console.error('Error in getUsers:', err);
    res.status(500).json({ message: err.message });
  }
};

// List all stores with filtering and sorting
exports.getStores = async (req, res) => {
  try {
    const { name, email, address, sortBy = 'name', order = 'ASC' } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    // detect alias used for Rating association on Store
    const assocEntry = Object.entries(Store.associations).find(
      ([alias, assoc]) => assoc.target && assoc.target.name === 'Rating'
    );
    const ratingAlias = assocEntry ? assocEntry[0] : 'Ratings'; // fallback

    // include using the detected alias
    const stores = await Store.findAll({
      where,
      include: [{ model: Rating, as: ratingAlias }],
      order: [[sortBy, order]],
    });

    // use the same alias when reading results
    const result = stores.map((store) => {
      const ratingsArr = store[ratingAlias] || [];
      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating:
          ratingsArr.length > 0
            ? (ratingsArr.reduce((sum, r) => sum + r.rating, 0) / ratingsArr.length).toFixed(2)
            : 0,
      };
    });

    res.json(result);
  } catch (err) {
    console.error('Error in getStores:', err);
    res.status(500).json({ message: err.message });
  }
};

// Add new store with validation
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || name.length < 3 || name.length > 60) {
      return res
        .status(400)
        .json({ message: 'Name must be 3-60 characters.' });
    }
    if (!address || address.length > 400) {
      return res.status(400).json({ message: 'Address max 400 characters.' });
    }

    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json(store);
  } catch (err) {
    console.error('Error in addStore:', err);
    res.status(400).json({ message: err.message });
  }
};

// Add new user/admin with validation
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || name.length < 3 || name.length > 60) {
      return res
        .status(400)
        .json({ message: 'Name must be 3-60 characters.' });
    }
    if (!address || address.length > 400) {
      return res.status(400).json({ message: 'Address max 400 characters.' });
    }
    if (
      !password ||
      password.length < 8 ||
      password.length > 16 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      return res.status(400).json({
        message:
          'Password must be 8-16 chars, include uppercase and special char.',
      });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const user = await User.create({ name, email, address, password, role });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error in addUser:', err);
    res.status(400).json({ message: err.message });
  }
};
