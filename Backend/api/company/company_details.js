var express = require('express');
var db = require('../../db/database.js');
var router = express.Router();
var md5 = require('md5');

router.get('/getCompanyDetails', (req, res) => {
    var getCompanyDetailsQuery = "select * from company_details where company_id='" + req.query.companyId + "'";
    db.query(getCompanyDetailsQuery, (err, companyDetailsRows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.send(companyDetailsRows);
    });
});

router.get('/getCompanyOwnerDetails', (req, res) => {
    var getCompanyOwnerDetailsQuery = "select * from owner_details where company_id='" + req.query.companyId + "'";
    db.query(getCompanyOwnerDetailsQuery, (err, companyOwnerDetailsRows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.send(companyOwnerDetailsRows);
    });
});

router.post('/saveOrUpdateCompanyDetails', (req, res) => {
    var checkCompanyDetailsExistOrNotQuery =
        "select company_id from company_details where company_id='" + req.body.company_id + "'";
    db.query(checkCompanyDetailsExistOrNotQuery, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else {
            if (rows.length > 0) {
                let updateCompanyDetailsQuery =
                    "update company_details set company_id='" +
                    req.body.companyId +
                    "',company_gst_no='" +
                    req.body.company_gst_no +
                    "',company_pan_no='" +
                    req.body.company_pan_no +
                    "',street_address='" +
                    req.body.street_address +
                    "',city_name='" +
                    req.body.city_name +
                    "',tahsil_name='" +
                    req.body.tahsil_name +
                    "',district_name='" +
                    req.body.district_name +
                    "',state_id='" +
                    req.body.state_id +
                    "',pin_code='" +
                    req.body.pin_code +
                    "',state_code='" +
                    req.body.state_code +
                    "',phone_number='" +
                    req.body.phone_no +
                    "',mobile_number='" +
                    req.body.mobile_no +
                    "',alternate_mobile_number='" +
                    req.body.alt_mobile_no +
                    "',company_tagline='" +
                    req.body.company_tagline +
                    "',record_updated_by='" +
                    req.body.record_updated_by +
                    "',record_updated_date='" +
                    req.body.record_updated_date +
                    "' where company_id='" +
                    req.body.companyId +
                    "'";
                db.query(updateCompanyDetailsQuery, (err, updated_rows) => {
                    if (err) {
                        console.log(err.message);
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.send({ success: 'Records updated successfully.' });
                });
            } else {
                let saveCompanyDetailsQuery =
                    "insert into company_details set company_id='" +
                    req.body.companyId +
                    "',company_gst_no='" +
                    req.body.company_gst_no +
                    "',company_pan_no='" +
                    req.body.company_pan_no +
                    "',street_address='" +
                    req.body.street_address +
                    "',city_name='" +
                    req.body.city_name +
                    "',tahsil_name='" +
                    req.body.tahsil_name +
                    "',district_name='" +
                    req.body.district_name +
                    "',state_id='" +
                    req.body.state_id +
                    "',pin_code='" +
                    req.body.pin_code +
                    "',state_code='" +
                    req.body.state_code +
                    "',phone_number='" +
                    req.body.phone_no +
                    "',mobile_number='" +
                    req.body.mobile_no +
                    "',alternate_mobile_number='" +
                    req.body.alt_mobile_no +
                    "',company_tagline='" +
                    req.body.company_tagline +
                    "',record_updated_by='" +
                    req.body.record_updated_by +
                    "',record_updated_date='" +
                    req.body.record_updated_date +
                    "'";
                db.query(saveCompanyDetailsQuery, (err, inserted_rows) => {
                    if (err) {
                        console.log(err.message);
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.send({ success: 'Records saved successfully.' });
                });
            }
        }
    });
});


router.post('/saveOrUpdateCompanyOwnerDetails', (req, res) => {
    var checkCompanyOwnerDetailsExistOrNotQuery =
        "select company_id from owner_details where company_id='" + req.body.companyId + "'";
    db.query(checkCompanyOwnerDetailsExistOrNotQuery, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else {
            if (rows.length > 0) {
                let updateCompanyOwnerDetailsQuery =
                    "update owner_details set owner_name='" +
                    req.body.owner_name +
                    "',adhaar_card_no='" +
                    req.body.adhaar_card_no +
                    "',pan_card_no='" +
                    req.body.pan_card_no +
                    "',street_address='" +
                    req.body.street_address +
                    "',city_name='" +
                    req.body.city_name +
                    "',tahsil_name='" +
                    req.body.tahsil_name +
                    "',district_name='" +
                    req.body.district_name +
                    "',state_id='" +
                    req.body.state_id +
                    "',pin_code='" +
                    req.body.pin_code +
                    "',phone_number='" +
                    req.body.phone_no +
                    "',mobile_number='" +
                    req.body.mobile_no +
                    "',alternate_mobile_number='" +
                    req.body.alt_mobile_no +
                    "',record_updated_by='" +
                    req.body.record_updated_by +
                    "',record_updated_date='" +
                    req.body.record_updated_date +
                    "' where company_id='" +
                    req.body.companyId +
                    "' AND owner_id='"+req.body.owner_id+"'";
                db.query(updateCompanyOwnerDetailsQuery, (err, updated_rows) => {
                    if (err) {
                        console.log(err.message);
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.send({ success: 'Records updated successfully.' });
                });
            } else {
                let saveCompanyOwnerDetailsQuery =
                    "insert into owner_details set company_id='" +
                    req.body.companyId +
                    "',owner_name='" +
                    req.body.owner_name +
                    "',adhaar_card_no='" +
                    req.body.adhaar_card_no +
                    "',pan_card_no='" +
                    req.body.pan_card_no +
                    "',street_address='" +
                    req.body.street_address +
                    "',city_name='" +
                    req.body.city_name +
                    "',tahsil_name='" +
                    req.body.tahsil_name +
                    "',district_name='" +
                    req.body.district_name +
                    "',state_id='" +
                    req.body.state_id +
                    "',pin_code='" +
                    req.body.pin_code +
                    "',phone_number='" +
                    req.body.phone_no +
                    "',mobile_number='" +
                    req.body.mobile_no +
                    "',alternate_mobile_number='" +
                    req.body.alt_mobile_no +
                    "',record_updated_by='" +
                    req.body.record_updated_by +
                    "',record_updated_date='" +
                    req.body.record_updated_date +
                    "'";
                db.query(saveCompanyOwnerDetailsQuery, (err, inserted_rows) => {
                    if (err) {
                        console.log(err.message);
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.send({ success: 'Records saved successfully.' });
                });
            }
        }
    });
});


module.exports = router;