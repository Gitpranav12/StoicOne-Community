const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.create);
router.get('/', questionController.list);
router.get('/recent', questionController.recent); 
router.get('/:id', questionController.detail);
router.get('/tags/all', questionController.allTags);
// ANSWERS
router.post('/answer', questionController.addAnswer);
router.get('/:id/answers', questionController.getAnswersByQuestion);

// COMMENTS
router.post('/comment', questionController.addComment);
router.get('/:id/comments', questionController.getCommentsByQuestion);

// VOTES
router.post('/vote', questionController.voteQuestion);
router.get('/:id/votes', questionController.getQuestionVotes);



module.exports = router;
