import { Injectable } from '@angular/core';
import { LoginModel } from '../typings/api/models/LoginModel';
import { LoginResult } from '../typings/api/results/LoginResult';
import { ApiService } from '../utils/api';

@Injectable()
export class LoginService {
  constructor(private apiService: ApiService) {}

  async login(model: LoginModel): Promise<LoginResult> {
    return await this.apiService.post<LoginResult>('jwt-auth/v1/token', model) as LoginResult;
  }
}