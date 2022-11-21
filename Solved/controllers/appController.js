const { thoughts, User } = require('../models');

module.exports = {
  // Function to get all of the thoughtss by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  getthoughtss(req, res) {
    thoughts.find()
      .then((thoughtss) => res.json(thoughtss))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single thoughts using the findOneAndUpdate method. We pass in the ID of the thoughts and then respond with it, or an error if not found
  getSinglethoughts(req, res) {
    thoughts.findOne({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new thoughts. Accepts a request body with the entire thoughts object.
  // Because thoughtss are associated with Users, we then update the User who created the app and add the ID of the thoughts to the thoughtss array
  createthoughts(req, res) {
    thoughts.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughtss: thoughts._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'thoughts created, but found no user with that ID',
            })
          : res.json('Created the thoughts 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates and thoughts using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updatethoughts(req, res) {
    thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes an thoughts from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on he app ID and update the thoughtss array for the User.
  deletethoughts(req, res) {
    thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : User.findOneAndUpdate(
              { thoughtss: req.params.thoughtsId },
              { $pull: { thoughtss: req.params.thoughtsId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'thoughts created but no user with this id!',
            })
          : res.json({ message: 'thoughts successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Adds a reaction to an thoughts. This method is unique in that we add the entire body of the reaction rather than the ID with the mongodb $addToSet operator.
  addreaction(req, res) {
    thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thoughts reaction. This method finds the thoughts based on ID. It then updates the reaction array associated with the app in question by removing it's reactionId from the reaction array.
  removereaction(req, res) {
    thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
