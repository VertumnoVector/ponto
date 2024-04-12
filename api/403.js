const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/403');
});

router.post('/', (req, res) => {
    
});

module.exports = router;