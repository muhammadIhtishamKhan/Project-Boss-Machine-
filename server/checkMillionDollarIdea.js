const checkMillionDollarIdea = (req, res, next) => {
  if (req.body.weeklyRevenue * req.body.numWeeks >= 1000000) {
    next();
  } else {
    res.status(400).send();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
