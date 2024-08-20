const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password);
const comparedPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

module.exports = {
    hashPassword, comparedPassword
}