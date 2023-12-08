import { Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  size: string;
  price: number;
}
