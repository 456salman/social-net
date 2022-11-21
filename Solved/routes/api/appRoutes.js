const router = require('express').Router();
const {
  getthoughtss,
  getSinglethoughts,
  createthoughts,
  updatethoughts,
  deletethoughts,
  addreaction,
  removereaction,
} = require('../../controllers/appController');

// /api/thoughtss
router.route('/').get(getthoughtss).post(createthoughts);

// /api/thoughtss/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSinglethoughts)
  .put(updatethoughts)
  .delete(deletethoughts);

// /api/thoughtss/:thoughtsId/reaction
router.route('/:thoughtsId/reaction').post(addreaction);

// /api/thoughtss/:thoughtsId/reaction/:reactionId
router.route('/:thoughtsId/reaction/:reactionId').delete(removereaction);

module.exports = router;
