import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../dto/user-response';
import {UserRegistrationRequest} from '../dto/user-registration-request';
import {LoginResponse} from '../dto/login-response';
import { LoginRequest } from '../dto/login-request';
import {UserEdit} from '../dto/user-edit';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:8080/api/auth/login";
  private urlRegistro = "http://localhost:8080/api/auth/register"
  private urlEditar = "http://localhost:8080/api/auth/perfil"
  constructor(private http: HttpClient) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.urlRegistro}`, user);
  }
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}`, credentials);
  }
  editar(user: UserEdit): Observable<UserResponse>{
    return this.http.put<UserResponse>(`${this.urlEditar}`, user);
  }
}
