const validUrl = require("valid-url");
const uuidv4 = require('uuid/v4');
const shortid = require("shortid");
const db = require('../db/index.js');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

const create = async (req, res) => {
    const { originalUrl } = req.body;
    const shortBaseUrl = process.env.SHORT_BASE_URL;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      const shortUrl = shortBaseUrl + "/" + urlCode;
        const findOne = 'SELECT * FROM urls WHERE urlCode = $1';
        try {
          const { rows } = await db.query(findOne, [urlCode]);
          if (rows[0]) {
            return create(req, res);
          }
        } catch(error) {
          console.log('findOne Error');
          return res.status(500).send(error);
        }
          const createQuery = `INSERT INTO
          urls(id, originalUrl, urlCode, shortUrl, created_date, modified_date)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
          const values = [
            uuidv4(),
            originalUrl,
            urlCode,
            shortUrl,
            moment(new Date()),
            moment(new Date())
          ];
      try {
          const { rows } = await db.query(createQuery, values);
          return res.status(200).json(rows[0]);
        } catch (err) {
          console.log('create Error');
          res.status(401).json("Invalid User Id");
        }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
};

const retrieveById = (req, res) => {
  let urlCode = '';
  if (urlCode === '') urlCode = req.params.code;
  const findOne = 'SELECT * FROM urls WHERE urlCode = $1';
  db.query(findOne, [urlCode]).then((result) => {
    if (result.rows[0]) {
      return res.redirect(result.rows[0].originalurl);
    } else {
      return res.redirect(process.env.ERROR_URl);
    }
  }).catch((error) => {return res.status(500).send(error);});
};

module.exports = {
  create,
  retrieveById,
};
