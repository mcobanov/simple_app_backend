var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* POST api/contact/ */
router.post('/',[
  body('email', 'Email field must be valid e-mail address.').isEmail(),
  body('message', 'Message field must be 30 characters long.').isLength({ min: 30 })

], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    return res.status(200).json('Your message has been sent!');
  }

});

module.exports = router;
