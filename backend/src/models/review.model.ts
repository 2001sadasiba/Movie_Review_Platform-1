import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  userId: Types.ObjectId;
  movieId: string; 
  rating: number;
  reviewText: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    movieId: {
      type: String,
      required: true, 
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true, 
  }
);

export const ReviewModel = model<IReview>('Review', ReviewSchema);