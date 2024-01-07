
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT id, email, sexe, date_naissance, nom, prenom, password FROM users WHERE email = ? AND password = ?';

  req.mysql.execute(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    console.log(user)
    res.json(user);
  });
};


// Function to handle user registration
exports.register = (req, res) => {
  const { email, password, nom, prenom, date_naissance, sexe } = req.body;

  if (!email || !password || !nom || !prenom || !date_naissance || !sexe || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }


    const query = 'INSERT INTO users (email, password, nom, prenom, date_naissance, sexe) VALUES (?, ?, ?, ?, ?, ?)';

    req.mysql.execute(query, [email, password, nom, prenom, date_naissance, sexe], (dbErr) => {
      if (dbErr) {
        console.error(dbErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'Registration successful' });
    });
};

exports.update = (req, res) => {
  const { userId, nom, prenom, email, password, date_naissance, sexe } = req.body;

  if (!userId || !nom || !email || !prenom ||  !password || !date_naissance || !sexe) {
    return res.status(400).json({ error: 'Incomplete data for update' });
  }


  const query = 'UPDATE users SET nom = ?, prenom = ?, email = ?, password = ?, date_naissance = ?, sexe = ? WHERE id = ?';

  req.mysql.execute(query, [nom, prenom, email, password, date_naissance, sexe, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'User data updated successfully' });
  });
};

exports.getById = (req, res) => {

  const userId = parseInt(req.params.id, 10); 
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }


  const query = 'SELECT id, nom, prenom, email, password, date_naissance, sexe FROM users WHERE id = ?';

  req.mysql.execute(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    res.json(user);
  });
};

