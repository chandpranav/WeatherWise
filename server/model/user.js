import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    user: String,
    password: String
})

const User = model("User",UserSchema)

export default User