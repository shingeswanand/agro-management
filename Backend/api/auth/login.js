var express = require('express');
var db = require('../../db/database.js');
var router = express.Router();
var md5 = require('md5');

router.post('/login', (req, res) => {
    let loginQuery =
        "SELECT user_id,user_name,user_password,user_role from user_master where user_name = '" +
        req.body.userName +
        "' AND user_password='" +
        req.body.userPassword +
        "' AND account_status=1";
    console.log(loginQuery);
    db.query(loginQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(400).send({
                message: 'Server error'
            });
        }
        if (result != '') {
            res.send(result);
        } else {
            res.status(400).send({
                message: 'Invalid Login'
            });
            return;
        }
    });
});

module.exports = router;