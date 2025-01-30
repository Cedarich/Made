import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string) {
    // Add your login logic here
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 