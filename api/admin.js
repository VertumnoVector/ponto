
const express = require('express');
const router = express.Router();
const { pool } = require('../config/dbConfig');
const bcrypt = require("bcrypt");


router.get("/", checkAuthenticated, async (req, res) => {
    const errMsg = req.flash('err_msg');
    const successMsg = req.flash('success');

    if (req.user.isadmin) {
        pool.query(
            `SELECT id, username, name, timeleft, email, isadmin FROM users order by id`,
            (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("adminPanel", { users: results.rows, errMsg });
                }
            }
        );

    } else {
        res.redirect("/dashboard");
    }
});

router.post("/create", checkAuthenticated, async (req, res) => {
    try {
        const { name, email, timeleft, password, password2 } = req.body;

        const errors = [];
        const year = 2024;
        const random1 = Math.floor(Math.random() * 10);
        const random2 = Math.floor(Math.random() * 10);
        const random3 = Math.floor(Math.random() * 10);
        const random4 = Math.floor(Math.random() * 10);
        const username = `${year}${random1}${random2}${random3}${random4}`;

        if (!name || !email || !timeleft || !password || !password2) {
            errors.push({ message: "Por favor, preencha todos os campos." });
        }

        if (password.length < 6) {
            errors.push({ message: "A senha precisa ter pelo menos 6 caracteres." });
        }

        if (password !== password2) {
            errors.push({ message: "As senhas não conferem." });
        }

        if (errors.length > 0) {
            req.flash("err_msg", errors);
            return res.status(401).redirect("/");
        }
        

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (existingUser.rows.length > 0) {
            errors.push({ message: "Email já registrado." });
            req.flash("err_msg", errors);
            return res.status(401).redirect("/");
        }

        const newUser = await pool.query(
            `INSERT INTO users (username, password, timeleft, email, isadmin, name)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, password`,
            [username, hashedPassword, timeleft, email, false, name]
        );
        console.log(newUser.rows);
        req.flash("success_msg", "Usuário registrado.");
        return res.status(302).redirect("/");
    } catch (err) {
        console.error(err);
        req.flash("err_msg", [{ message: "Erro ao registrar usuário." }]);
        return res.status(401).redirect("/");
    }
});

router.post("/delete", checkAuthenticated, async (req, res) => {
    const userId = req.body.userId; 

    try {
        // Implemente a lógica para excluir o usuário do banco de dados
        await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Erro: Colaborador com registro ativo." });
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


module.exports = router;
