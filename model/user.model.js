const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unquie: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//အဲ့ပိုင်းကို user ကထည့်လိုက်တဲ့ password ကိုပြောင်းပြီးတော့ သိမ်းပေးထားတဲ့အပိုင်းဖြစ်တယ်
userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10); //password ကို ဆယ်ကြိမ်လုပ်မည်လို့ကိုပြောထားတာ
    const hashpass = await bcrypt.hash(user.password, salt);

    user.password = hashpass;
  } catch (error) {
    throw error;
  }
});

const userModel = db.model("user", userSchema);

module.exports = userSchema;
module.exports = userModel;
