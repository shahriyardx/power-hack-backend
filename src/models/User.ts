import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  email: String,
  hash: String,
})

export default models.User || model("User", UserSchema)
