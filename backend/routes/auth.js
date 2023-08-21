const express = require("express");
const Users = require("../modules/Users");
const router = express.Router();
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser")

const jwt_key = "chanduisaprogrammer@";
/*{
    "name":"john",
    "email":"cena@gmail.com",
    "password":"johncena"
  }*/

// Endpoint 1 - Creating an user with 'POST' request-"/api/auth/createuser"
router.post(
  "/create",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("number", "Enter a valid number").isLength({ min: 10 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be greater than 4 characters").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    try {
      // Validating the error if occurred,then return a bad request and error also
      let success =  false;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ success,error: error.array() });
      }

      // Creating a user with unique email ID
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry this email is already in use" });
      }
      

      // Creating a secure hashed password using bcrypt
      const salt = await bcrypt.genSalt(5);
      const secure_password = await bcrypt.hash(req.body.password, salt);

      // Updating the user value
      user = await Users.create({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: secure_password
      });
      const payload = {
        user: {
          id: user.id
        }
      };
      success = true;
      const jwtData = jwt.sign(payload, jwt_key);
      res.json({ success, jwtData });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal error occurred" });
    }
  }
);

// Endpoint 2 - Authenticating a user with 'POST' - api/auth/login (endpoint)

router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists()
  ],
  async (req, res) => {
    // validating the request made by the user
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      res.status(400).json({ success,error: "Invalid input" });
    }

    
    let { email, password } = req.body;
    try {
    const user = await Users.findOne({email});
    if (!user) {
      res
      .status(400)
      .json({ success, error: "Please try to fill out with correct credentials" })
    }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        res
          .status(400)
          .json({ success, error: "Please try to fill out with correct credentials" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      success = true;
      const authtoken = jwt.sign(payload,jwt_key);
      res.json({success, authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal error occurred" });
    }
  }
);


// Endpoint 3 - Getting Loggedin user details with 'POST' - api/auth/getuser
router.post(
  "/getuser",fetchUser, async (req,res)=>{

    try {
      const userId = req.user.id;
      const user = await Users.findById(userId).select("-password");
      res.send(user);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Cannot fetch the user" });
    }
  }
)


module.exports = router;
