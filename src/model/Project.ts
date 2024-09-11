import mongoose, { Schema, Document } from 'mongoose';

export interface Sphere extends Document {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string;
}

export const SphereSchema: Schema<Sphere> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const SphereModel =
  (mongoose.models.Sphere as mongoose.Model<Sphere>) ||
  mongoose.model('Sphere', SphereSchema);
