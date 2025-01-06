const VehicleLocation = require('../models/VehicleLocation');

exports.saveLocation = async (req, res) => {
  try {
    const { latitude, longitude, timestamp } = req.body;
    const newLocation = new VehicleLocation({ latitude, longitude, timestamp });
    await newLocation.save();
    res.status(200).json({ message: 'Location saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving location', error });
  }
};
