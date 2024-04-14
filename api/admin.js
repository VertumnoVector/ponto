
const express = require('express');
const router = express.Router();
const { pool } = require('../config/dbConfig');
const bcrypt = require("bcrypt");


router.get("/", checkAuthenticated, (req, res) => {
    if (req.user.isadmin) {
        pool.query(
            `SELECT id, username, name, timeleft, email, isadmin FROM users order by id`,
            (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("adminPanel", { users: results.rows });
                }
            }
        );

    } else {
        res.redirect("/dashboard");
    }
});

router.post("/create", async (req, res) => {
    let { name, email, timeleft, password, password2 } = req.body;

    let errors = [];

    let year = 2024;
    let random1 = Math.floor(Math.random() * 10);
    let random2 = Math.floor(Math.random() * 10);
    let random3 = Math.floor(Math.random() * 10);
    let random4 = Math.floor(Math.random() * 10);

    let username = `${year}${random1}${random2}${random3}${random4}`;

    if (!name || !email || !timeleft || !password || !password2) {
        errors.push({ message: "Por favror preencha todos os campos." });
    }

    if (password.length < 6) {
        errors.push({ message: "A senha precisa ser pelo menos 6 caracteres." });
    }

    if (password !== password2) {
        errors.push({ message: "Senhas não conferem." });
    }

    if (errors.length > 0) {
        res.render("adminPanel", { errors, name, email, password, password2 });
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // Validation passed
        pool.query(
            `SELECT * FROM users
            WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (results.rows.length > 0) {
                    errors.push({ message: "Email já registrado." });
                    return res.render("adminPanel", { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (username, password, timeleft, email, isadmin, name)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id, password`,
                        [username, hashedPassword, timeleft, email, false, name],
                        (err, results) => {
                            if (err) {
                                console.error(err)
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash("success_msg", "Usuário registrado.");
                            res.redirect('/');
                        }
                    );
                }
            }
        );
    }
});

router.post("/delete", checkAuthenticated, async (req, res) => {
    const userId = req.body.userId;

    try {
        // Implemente a lógica para excluir o usuário do banco de dados
        await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

        // Envie uma resposta de sucesso
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir usuário");
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


module.exports = router;
