import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Feedback extends Document {
  content: string;
  rating?: number;
  sphere: Types.ObjectId;
  name?: string;
  email?: string;
}

const FeedbackSchema: Schema<Feedback> = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content can't be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    sphere: {
      type: Schema.ObjectId,
      ref: 'Sphere',
      required: [true, 'A Feedback must belong to a Sphere'],
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const FeedbackModel =
  (mongoose.models.Feedback as mongoose.Model<Feedback>) ||
  mongoose.model<Feedback>('Feedback', FeedbackSchema);
