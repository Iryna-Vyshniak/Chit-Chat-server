import { Schema } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';
import { model } from 'mongoose';

export const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.post('save', handleMongooseError);

const Comment = model('Comment', commentSchema);

export default Comment;
