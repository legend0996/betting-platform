import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterInput, LoginInput, AuthResponse } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export class AuthService {
  /**
   * Register user
   */
  static async register(input: RegisterInput): Promise<AuthResponse> {
    const { username, email, password } = input;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // No DB yet — mock user
    const user = {
      id: Date.now(),
      username,
      email,
      password: hashedPassword,
    };

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }

  /**
   * Login user
   */
  static async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    if (!email || !password) {
      throw new Error("Email and password required");
    }

    // Mock user (since no DB)
    const mockUser = {
      id: 1,
      username: "testuser",
      email,
      password: await bcrypt.hash("password123", 10),
    };

    const isMatch = await bcrypt.compare(password, mockUser.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
      token,
    };
  }
}
