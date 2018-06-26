const User = require('../models/user');

function showRoute(req, res, next) {
  User.findById(req.params.id)
    .populate('favorites')
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function profile(req, res) {
  return res.json(req.currentUser);
}

function createFavouriteRoute(req, res, next) {
  req.currentUser.favourites.push(req.body);
  req.currentUser.save()
    .then(user => res.json(user))
    .catch(next);
}
function deleteFavouriteRoute(req, res, next) {
  return User.findById(req.currentUser._id)
    .then(user => {
      user.favourites = user.favourites.filter(favourite => !favourite.equals(req.params.id));
      return user.save();
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}



module.exports = {
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  createFavourite: createFavouriteRoute,
  deleteFavourite: deleteFavouriteRoute,
  profile: profile
};
