const { Schema, model } = require("mongoose");

const Joi = require("joi");

const avatarSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "Wrong way"],
    },
  },
  { versionKey: false, timestamps: true }
);

const addImage = Joi.object({
  image: Joi.string().required(),
});

const schemas = {
  addImage,
};

const Avatar = model("avatar", avatarSchema);

module.exports = {
  schemas,
  Avatar,
};
