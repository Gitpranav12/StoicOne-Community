const Question = require('../models/questionModel');

exports.create = async (req, res) => {
  try {
    const { title, bodyHtml, bodyText, tags, author, time } = req.body;
    const [result] = await Question.createQuestion({ title, bodyHtml, bodyText, tags, author, time });
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const [questions] = await Question.getAllQuestions();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.incViews(id); // <--- add this line
    const [rows] = await Question.getQuestionById(id);
    if (rows.length === 0) return res.status(404).json({ error: 'Question not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.recent = async (req, res) => {
  try {
    const [questions] = await Question.getRecentQuestions();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add this function in questionController.js
exports.allTags = async (req, res) => {
  try {
    const tags = await Question.getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// --- ANSWERS ---
exports.addAnswer = async (req, res) => {
  try {
    const { question_id, author, content } = req.body;
    await Question.addAnswer({ question_id, author, content });
    await Question.incAnswers(question_id); // <--- add this line
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAnswersByQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const [answers] = await Question.getAnswersByQuestion(id);
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- COMMENTS ---
exports.addComment = async (req, res) => {
  try {
    const { question_id, author, content } = req.body;
    await Question.addComment({ question_id, author, content });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsByQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const [comments] = await Question.getCommentsByQuestion(id);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- VOTES ---
exports.voteQuestion = async (req, res) => {
  try {
    const { question_id, voter, vote_type } = req.body;
    const votes = await Question.voteQuestion({ question_id, voter, vote_type });
    res.json({ votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionVotes = async (req, res) => {
  try {
    const { id } = req.params;
    const votes = await Question.getQuestionVotes(id);
    res.json({ votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
