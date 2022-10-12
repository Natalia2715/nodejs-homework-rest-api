const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
    subscription: req.user.subscription,
  });
};

module.exports = getCurrent;
