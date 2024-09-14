import express from "express";
import jwt from "jsonwebtoken";
import zod, { tuple } from "zod";

const app = express();

const secret = "hithere1234";

// const user = {
//     username: "rwd",
//     password: "123456",
// };

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

// Generates a JWT for a given username and password.
function signJWT(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if (!usernameResponse.success || !passwordResponse.success) return null;

    const signature = jwt.sign({ username }, secret); //can be viewed by anyone
    return signature;
}

const token = signJWT("sfkjf@gmail.com", "123456");
console.log(token);

// Decodes a JWT to get the username.
function decodeJWT(token) {
    const decode = jwt.decode(token); //can be decoded without secret
    if (decode) return decode.username;
    else return false;
}

console.log(decodeJWT(token));

function verifyJWT(token) {
    try {
        const verifiedData = jwt.verify(token, secret);
        console.log(verifiedData);
        return true;
    } catch (e) {
        console.log("Verfication Failed!");
    }

    return false;
}

console.log(verifyJWT("dvcshdvcuhsdcusdhcvudvcuhascuwegd"));
