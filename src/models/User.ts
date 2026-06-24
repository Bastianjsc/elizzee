import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "customer";

  // Campos opcionales para la dirección
  address?: string;
  region?: string;
  commune?: string;
  addressType?: string;

  // Campos para restablecimiento de contraseña
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    address: { type: String },
    region: { type: String },
    commune: { type: String },
    addressType: { type: String },

    // Se usan cuando el usuario solicita restablecer contraseña
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);