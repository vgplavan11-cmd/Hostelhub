"use server";

import { UserRepository } from "@/lib/repositories/UserRepository";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" };
  }

  try {
    // Check if user already exists
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    // Create the new user
    await UserRepository.create({
      name,
      email,
      passwordHash: password, // For hackathon MVP; should be hashed in production
      role: "student", // Default role for open signups
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "An error occurred while creating your account" };
  }
}
