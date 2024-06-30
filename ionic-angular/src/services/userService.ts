import { Injectable } from '@angular/core';
import { UserModel } from '../typings/api/models/UserModel';
import { UserResult } from '../typings/api/results/UserResult';
import { Observable } from 'rxjs';
import { ApiService } from '../utils/api';

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}

  async getUsers(): Promise<UserResult[]> {
    return await this.apiService.get<UserResult[]>('wp/v2/users?context=edit') as UserResult[];
  }

  async getUserById(id: string): Promise<UserResult> {
    return await this.apiService.get<UserResult>(`wp/v2/users/${id}?context=edit`) as UserResult;
  }

  async createUser(model: UserModel): Promise<UserResult> {
    return await this.apiService.post<UserResult>('wp/v2/users', model) as UserResult;
  }
}