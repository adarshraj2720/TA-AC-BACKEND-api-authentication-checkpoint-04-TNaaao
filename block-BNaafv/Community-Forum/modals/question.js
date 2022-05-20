let mongoose = require("mongoose");
let slugger = require("slugger");

let schema = mongoose.Schema;

let questionSchema = new schema(
  {
    title: { type: String, unique: true, require: true },
    description: String ,
    slug:  String ,
    author: { type: schema.Types.ObjectId, ref: "Profile" },
    upvoteCount: { type: Number, default: 0 },
    upvotedBy: [{ type: schema.Types.ObjectId, ref: "Profile" }],
    comments: [{ type: schema.Types.ObjectId, ref: "Comment" }],
    tags: [{ type: String }],
    answers: [{ type: schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

questionSchema.pre("save", function (next) {
  this.slug = slugger(this.title);
  next();
});

let Question = mongoose.model("Question", questionSchema);
module.exports = Question;