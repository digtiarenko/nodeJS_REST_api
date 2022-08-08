const { User } = require('../../models/user');

const changeSubscription = async (_id, subscription) => {
  const data = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true },
  );
  return data;
};

module.exports = changeSubscription;
