const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail
} = require("../models/userModel");



const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    findUserByEmail(email, async (err, user) => {

        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        createUser(
            name,
            email,
            hashedPassword,
            "patient",
            (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: "Patient Registered Successfully"
                });
            }
        );
    });
};



const login = (req, res) => {

    const { email, password } = req.body;

    findUserByEmail(email, async (err, user) => {

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            role: user.role
        });
    });
};

module.exports = {
    register,
    login
};
