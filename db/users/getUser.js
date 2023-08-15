import { client } from "../client.js";
import * as bcrypt from "bcrypt.js"; 


async function getAllUsers() {
    
    try {
        console.log("Getting all users...")

        const { users } = await client.query(`
        SELECT * FROM users;
        `)

        if (!users) {
            return null;
        }

        return users;
        
    } catch (error) {
        console.log("Error getting all users!")
        throw error
    }
}

async function getUser({ username, password }) {
  
    console.log("inside getUser");
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!user){
        console.log("Error getting user")
        return null;
    }
    
    if (isValid) {
      delete user.password;

      return user;
    }
 
}

async function getUserByUsername({username}) {
    try{
        console.log("Inside getUserByUsername");
const {
    rows: [user],
} = await client.query(`
SELECT id, username, password FROM users WHERE username = ${username};
`);

if (!user) {
    return null;
} 
return user;

    } catch (error) {
        console.log("Error getting user by username...");
    throw error;
    } 
}

async function getUserById({userId}) {
    try {
        console.log("Getting users...")

        const {
            rows: [user],
        } = await client.query(`
        SELECT id, username FROM users WHERE id=${userId};`,
        [userId]
        );
        delete user.password;

        return user;

    } catch (error) {
        console.log("Error getting users");
        throw error;
    }
}

export {
    getAllUsers,
    getUser, 
    getUserById,
    getUserByUsername
}
