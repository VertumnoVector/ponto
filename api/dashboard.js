const express = require('express');
const router = express.Router();
const { pool } = require('../config/dbConfig');

async function getJornada(user_id) {
  const query = `
    SELECT timeleft FROM users
    WHERE id = $1;`;
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows[0].timeleft;

};

async function verificarRegistroExistente(user_id) {
  const query = `
    SELECT id FROM registro_de_pontos
    WHERE user_id = $1;`;

  const values = [user_id];

  const result = await pool.query(query, values);
  return result.rows.length > 0;
};

async function isIdPar(id) {
  const query = `
    SELECT id FROM registro_de_pontos
    WHERE user_id = $1;`;

  const values = [id];
  const result = await pool.query(query, values);
  const linhas = result.rows.length + 1;

  console.log('resto da divsao por 2: ', linhas % 2);
  return linhas > 0 && linhas % 2 === 0;
}



router.get('/', checkAuthenticated, async (req, res) => {
  if (req.user.isadmin) {
    return res.redirect('/admin');
  };

  // Captura o total de horas da jornada
  try {
    const jornada = await getJornada(req.user.id);
    console.log(jornada);

    // Popular a tabela dos horários
    pool.query(
      `SELECT id, starttime, stoptime FROM registro_de_pontos WHERE user_id = $1 ORDER BY id ASC`,
      [req.user.id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.render("dashboard", {
            results: results.rows,
            user: req.user.name,
            user_id: req.user.id,
            jornada: jornada  // Passa a constante jornada para o template
          });
        }
      }
    );

  } catch (error) {
    console.error('Erro ao resgatar informação:', error);
    res.status(500).json({ error: 'Erro ao resgatar informação' });
  }
});


router.post('/create', checkAuthenticated, async (req, res) => {
  const { user_id } = req.body;
  console.log('req body: ', user_id)

  try {
    // Verifica se já existe um registro para o user_id
    const registroExistente = await verificarRegistroExistente(user_id);

    let starttime = null;
    let stoptime = null;

    if (!registroExistente) {
      // Se não houver registro para o user_id, define o starttime
      starttime = new Date();
    } else {
      // Se houver registro, determina se o id é par ou ímpar
      const registroPar = await isIdPar(user_id);
      if (registroPar) {
        stoptime = new Date(); // Se id é par, define o stoptime
      } else {
        starttime = new Date(); // Se id é ímpar, define o starttime
      }
    }

    const query = `
      INSERT INTO registro_de_pontos (user_id, starttime, stoptime)
      VALUES ($1, $2, $3)
      RETURNING *;`;

    const values = [user_id, starttime, stoptime];

    const result = await pool.query(query, values);
    console.log('Registro de pontos inserido:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir registro de pontos:', error);
    res.status(500).json({ error: 'Erro ao inserir registro de pontos' });
  }
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
