import mongoose, { Schema, Document } from 'mongoose';
export interface Sphere extends Document {
  userId: string;
  title: string;
  description?: string;
  isAcceptingMessages: boolean;
  type: 'message' | 'feedback';
  showSuggestionToUser: boolean;
  apiKey: string;
  // toJSON: () => Record<string, any>;
}
export const SphereSchema: Schema<Sphere> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    isAcceptingMessages: Boolean,
    showSuggestionToUser: Boolean,
    apiKey: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const SphereModel =
  (mongoose.models.Sphere as mongoose.Model<Sphere>) ||
  mongoose.model('Sphere', SphereSchema);
