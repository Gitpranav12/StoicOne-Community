const db = require('../db');

// Create new question
exports.createQuestion = ({ title, bodyHtml, bodyText, tags, author, time }) =>
  db.execute(
    'INSERT INTO questions (title, bodyHtml, bodyText, tags, author, time) VALUES (?, ?, ?, ?, ?, ?)',
    [title, bodyHtml, bodyText, JSON.stringify(tags), author, time]
  );

// Get all questions
exports.getAllQuestions = () =>
  db.execute('SELECT * FROM questions ORDER BY createdAt DESC');

// Get one question by id
exports.getQuestionById = (id) =>
  db.execute('SELECT * FROM questions WHERE id = ?', [id]);

exports.getRecentQuestions = () =>
  db.execute('SELECT * FROM questions ORDER BY createdAt DESC LIMIT 5');

// Add this at the end of questionModel.js
exports.getAllTags = async () => {
  const [rows] = await db.execute('SELECT name FROM tags ORDER BY name');
  return rows.map(r => r.name);
};

// --- ANSWERS ---
exports.addAnswer = ({ question_id, author, content }) =>
  db.execute(
    'INSERT INTO answers (question_id, author, content) VALUES (?, ?, ?)',
    [question_id, author, content]
  );

exports.getAnswersByQuestion = (question_id) =>
  db.execute('SELECT * FROM answers WHERE question_id = ? ORDER BY createdAt ASC', [question_id]);

// --- COMMENTS ---
exports.addComment = ({ question_id, author, content }) =>
  db.execute(
    'INSERT INTO comments (question_id, author, content) VALUES (?, ?, ?)',
    [question_id, author, content]
  );

exports.getCommentsByQuestion = (question_id) =>
  db.execute('SELECT * FROM comments WHERE question_id = ? ORDER BY createdAt ASC', [question_id]);


// --- VOTES ---
exports.voteQuestion = async ({ question_id, voter, vote_type }) => {
  // Upsert logic: if vote exists, update, else insert
  await db.execute(
    'INSERT INTO question_votes (question_id, voter, vote_type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE vote_type = ?',
    [question_id, voter, vote_type, vote_type]
  );
  // Count votes
  const [rows] = await db.execute(
    'SELECT SUM(vote_type) as votes FROM question_votes WHERE question_id = ?',
    [question_id]
  );
  // Update main question votes field
  await db.execute('UPDATE questions SET votes = ? WHERE id = ?', [rows[0].votes || 0, question_id]);
  return rows[0].votes || 0;
};

exports.getQuestionVotes = async (question_id) => {
  const [rows] = await db.execute(
    'SELECT SUM(vote_type) as votes FROM question_votes WHERE question_id = ?',
    [question_id]
  );
  return rows[0].votes || 0;
};

// Increment views by 1 for each question detail fetch
exports.incViews = (id) =>
  db.execute('UPDATE questions SET views = views + 1 WHERE id = ?', [id]);

// Increment answer count on question
exports.incAnswers = (question_id) =>
  db.execute('UPDATE questions SET answers = answers + 1 WHERE id = ?', [question_id]);
