import type { LoginDto, LoginResponse } from "../types/auth.types.js";
import type { IUserRepository } from "../repositories/user.repository.interface.js";
import { UnauthorizedError } from "../utils/errors.js";
import { signAccessToken } from "../utils/jwt.js";
import { verifyPassword } from "../utils/password.js";

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async login(credentials: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );
    }

    const isPasswordValid = await verifyPassword(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );
    }

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
