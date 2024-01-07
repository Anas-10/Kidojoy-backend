// postController.js
const multer = require('multer');
const config = require("../config");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.path );
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const uploadNewPost = (req, res) => {
  const uploadFile = upload.single('file');

  uploadFile(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Extract title and user_id from the request body
    const { title, user_id } = req.body;

    // Extract the file path from multer
    const photoPath = req.file.path;

    // Insert into the database
    const mysql = req.mysql;

    try {
      const [result] = await mysql.promise().execute(
        'INSERT INTO post (user_id, photo, title) VALUES (?, ?, ?)',
        [user_id, photoPath, title]
      );

      // Check if the insertion was successful
      if (result.affectedRows === 1) {
        res.status(200).json({ message: 'Post created successfully' });
      } else {
        res.status(500).json({ error: 'Failed to create post' });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};


const getAllPosts = async (req, res) => {
  const mysql = req.mysql;

  try {
    const [rows] = await mysql.promise().query('SELECT * FROM post');
    
    // Ajouter le chemin local au chemin de chaque photo
    const postsWithLocalPath = rows.map(post => {
      return {
        ...post,
      };
    });

    res.status(200).json(postsWithLocalPath);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  module.exports = {
    uploadNewPost,
    getAllPosts,
  };
  

