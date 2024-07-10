import { Schema, model } from 'mongoose';

import { TAGS_ENUM } from '../utils/constants.js';
import handleMongooseError from '../helpers/handleMongooseError.js';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: [String],
      enum: TAGS_ENUM,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likedBy: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

postSchema.post('save', handleMongooseError);

const Post = model('post', postSchema);

export default Post;
