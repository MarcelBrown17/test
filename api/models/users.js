const db = require('../config');
const {hash, compare, hashSync} = require('bcrypt');
const {createToken} = require('../middleware/authenticateUser');

class Users {
    fetchUsers(req, res) {
        const query = `SELECT userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile FROM Users;`

        db.query(query, (err, results) => {
            if (err) throw err

            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    fetchUser(req, res) {
        const query = `SELECT userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile FROM Users WHERE userID = ${req.params.id};`

        db.query(query, (err, result) => {
            if (err) throw err

            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    async register(req, res) {
        const data = req.body;

        // encrypt password
        data.userPass = await hash(data.userPass, 15);

        // payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        };

        // query
        const query = `INSERT INTO Users SET ?;`;

        db.query(query,
            [data],
            (err) => {
                if (err) throw err

                // create token
                let token = createToken(user)
                res.cookie("LegitUser", token, {
                    maxAge: 3600000,
                    httpOnly: true
                });

                res.json({
                    status: res.statusCode,
                    message: "New user registered!"
                });
            });
    }

    login(req, res) {
        const {emailAdd, userPass} = req.body;

        // query
        const query = `SELECT firstName, lastName, userAge, gender, userRole, emailAdd, userPass FROM Users WHERE emailAdd = '${emailAdd}';`

        db.query(query, async (err, result) => {
            if (err) throw err

            if (!result?.length) {
                res.json({
                    status: res.statusCode,
                    message: "Incorrect email address!"
                });
            } else {
                await compare(userPass,
                    result[0].userPass,
                    (cErr, cResult) => {
                        if (cErr) throw cErr

                        // create token
                        const token = createToken({
                            emailAdd,
                            userPass
                        });

                        // save token
                        res.cookie("LegitUser",
                        token, {
                            maxAge: 3600000,
                            httpOnly: true
                        });

                        if (cResult) {
                            res.json({
                                message: "Welcome back to Puzzles Deli!",
                                token,
                                result: result[0]
                            });
                        } else {
                            res.json({
                                status: res.statusCode,
                                message: "Unregistered user or incorrect password!"
                            });
                        }
                    });
            }
        });
    }

    updateUser(req, res) {
        const query = `UPDATE Users SET ? WHERE userID = ?`

        const data = req.body;

        // encrypt password
        data.userPass = hashSync(data.userPass, 15);

        db.query(query,
            [data, req.params.id],
            (err) => {
                if (err) throw err

                res.json({
                    status: res.statusCode,
                    message: "User details updated!"
                });
            });
    }

    deleteUser(req, res) {
        const query = `DELETE FROM Users WHERE userID = ${req.params.id};`

        db.query(query, (err) => {
            if (err) throw err

            res.json({
                status: res.statusCode,
                message: "User deleted!"
            });
        });
    }
}

module.exports = Users;