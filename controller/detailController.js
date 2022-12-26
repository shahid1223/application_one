const multer = require('multer');
// import * as uuid from "uuid";
const uuid = require('uuid');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();
// const file = require('../')

const con = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.DATABASEUSERNAME,
    password: "",
    database: process.env.DATABASENAME
});

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'form-files/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fieldSize: 3000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile');

// Check the file type of the uploaded file
function checkFileType(file, cb) {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|gif/;
    // Check the extension of the file
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check the mimetype of the file
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Set up the route for file upload
exports.createDetail = (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.send(err);
            } else {
                if (req.file == undefined) {
                    res.send('Error: No File Selected!');
                } else {
                    // Save the file path and other details in the MySQL database
                    let id = uuid.v4()
                    const filePath = '/form-files/' + req.file.filename;
                    const name = req.body.name;
                    const email = req.body.email;
                    const message = req.body.message;
                    const sql = `INSERT INTO ${process.env.TABLENAME} (id, file_path, name, email,message) VALUES (?,?, ?, ?,?)`;
                    const values = [id, filePath, name, email, message];
                    con.query(sql, values, (err, result) => {
                        if (err) throw err;
                        console.log('File saved to database');
                        // res.send('File uploaded successfully!', result);
                        let resulutObj = {
                            id: id,
                            name: req.body.name,
                            email: req.body.email,
                            message: req.body.message,
                            filePath: `${process.env.BASEURL}${process.env.PORT}/api/v1/detail/${id}`,
                            result,
                        }
                        res.status(200).json({ msg: 'data saved', resulutObj, code: 200 })
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ err: error.message, code: 500 });
    }
};

exports.getImage = (req, res) => {
    try {
        const id = req.params.id;

        // Construct the SELECT statement
        const sql = `SELECT * FROM ${process.env.TABLENAME} WHERE id = ?`;

        // Execute the SELECT statement
        con.query(sql, [id], (error, results) => {
            if (error) throw error;
            if (results.length === 0) {
                return res.status(404).json({ error: 'file not found', code: 404 })
            };
            const filename = `${__dirname}/../${results[0].file_path}`;
            res.download(filename);
        });
    } catch (error) {
        console.log(error.message);
    }
}
