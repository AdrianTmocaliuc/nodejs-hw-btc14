const jwt = require("jsonwebtoken");
// require("dotenv").config();

const { User } = require("../models/user");

const { generateError } = require("../helpers");

/*
1.get from req, headers.authorization.
2. split authorization in 2 words  - first 'Bearer', second Token.
3. Check, equal first word with 'Bearer'.
    - if 'true' go to next stet,
    - if 'false' return error 401 - Unauthorized.
4. Check if token wos hash with our SECRET_KEY.
    - if 'true' get user 'id' and go to next stet,
    - if 'false' return error 401 - Unauthorized.
5. Fin in DB user with that 'id',
    - if 'true' add to object Request data and go next
     req.user = user;
     next()   
    - if 'false' return error 401 - Unauthorized.
*/

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw generateError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw generateError(401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
