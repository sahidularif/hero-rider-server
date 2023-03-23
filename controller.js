const Learner = require("./models/Learner");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const userController = {};
userController.allUser = async (req, res) => {

  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const searchFields = ['fullname', 'email', 'phone'];
    let renge = req.query.renge || "";

    if (renge !== "" && renge !== " ") {
      renge = renge.split("-")
    }

    const query = {
      $or: [
        ...searchFields.map(field => ({
          [field]: new RegExp('^' + search, 'i')
        }))
      ]
    };
    let user;


    if (renge !== "" && renge !== " ") {
      user = await User.find(query)
        .where('age')
        .lte(renge[1])
        .gte(renge[0])
        .skip(page * limit)
        .limit(limit)
        .exec()
    } else {
      user = await User.find(query)
        .skip(page * limit)
        .limit(limit)
        .exec()
    }

    const total = await User.countDocuments(query)
    const response = {
      total,
      page: page + 1,
      limit,
      user,
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).json(err);
  }

}
userController.getAllUsers = async (req, res) => {

  try {
    const user = await User.find()
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }

}
userController.register = async (req, res) => {
  try {

    const newRider = req.body
    const rider = new User(newRider)
    await rider.save();
    res.status(200).send("User successfully added")
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
}
userController.login = async (req, res) => {
  const { email, password } = req.body
  try {
    User.findOne({ email: email })
      .then((data) => {
        if (password !== data.password) {
          return res.status(400).send({
            message: "Passwords does not match",
            data: null,
          });
        }
        else {
          //   create JWT token
          const token = jwt.sign(
            {
              user: {
                id: data._id,
                name: data.fullname,
                email: data.email,
              },
            },
            `${'hero-rider'}`,
            { expiresIn: "1h" }
          );

          //   return success response
          res.status(200).send({
            message: "Login Successful",
            token,
          });
        }
      })
  } catch (e) {

  }
}


// serviceHandler.getAllProduct = async (req, res, next) => {

//   try {
//     const products = await Product.find();
//     // console.log(products);
//     res.status(200).send(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }

// }



module.exports = userController