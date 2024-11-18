const db = require("../config/db");



async function getAllUsers(req, res) {
  try {
    const data = await db.query("SELECT * FROM loginUsers;");

    res.json(data[0])

  } catch (err) {
    console.log("Error at getting users - ", err.message);
    res.status(500).json({ success: false, message: "error while getting users", error: err.message });
  }
}


async function getUserByName(req, res) {
  try {
    const nameId = req.params.name;

    if (!nameId || nameId === null) {
      return res.status(404).send({ success: false, message: "mention name in URL to get user details" });
    } else {
      const user = await db.query("SELECT * FROM loginUsers WHERE name = ?", [nameId]);

      if (user[0].length == 0) {
        res.status(404).json({ success: false, message: "No user found with name=" + req.params.name })
      } else {
        res.json(user[0][0]);
      }
    }
  } catch (err) {
    console.log("Error while getting user by name - ", err.message);
    res.status(500).json({ success: false, message: "error while getting user by name", error: err.message });
  }
}


async function createUser(req, res) {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json({ success: false, message: "please provide all the required feilds" });
    }
    else {
      const data = await db.query("INSERT INTO loginUsers VALUES (?, ?, ?);", [name, email, password])
      if (!data) {
        return res.status(404).send({ success: false, message: "error while inserting user" })
      }

      res.json({ success: true, message: "successfully, new user added in DB" })
    }

  } catch (err) {
    res.status(500).json({ success: false, message: "error while adding user", error: err.message })
  }
}


async function updateUserByName( req, res ){
  try{

    const nameId = req.params.name;
    if( !nameId || nameId===null ){
      res.status(500).json({success: false, message: "please provide proper name in url"});
    }


    const {name, email, password} = req.body;
    if( !name || !email || !password ){
      res.status(404).json({success: false, message: "please provide all the required fields"})
    }

    const data = await db.query("UPDATE loginUsers SET name=?, email=?, password=? where name=?", [name, email, password, nameId])
    if( !data ){
      res.status(500).message({success: false, message: "error while updating user"})
    }
    res.json({success: true, message: "successfully updated user with name="+nameId})
  } catch (err) {
    res.status(500).json({success: false, message:"error while updating user in db", error: err.message })
  }
}


async function deleteUserByName(req, res){
  try{

    const nameId = req.params.name;
    if( !nameId ){
      res.status(404).json({success: false, message: "provide proper name in url"})
    }

    const data = await db.query("DELETE FROM loginUsers WHERE name=?", [nameId])

    if( !data ){
      res.status(500).json({success: false, message: "error while deleting user"})
    }

    res.json({success: true, message: "successfully deleted user with name="+nameId})

  } catch( err){
    res.status(500).json({success: false, message: "error while deleting user", error: err.message })
  }
}


module.exports = { getAllUsers, getUserByName, createUser, updateUserByName, deleteUserByName }