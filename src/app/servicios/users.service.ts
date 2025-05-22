import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {UserResponse} from '../dto/user-response';
import {UserRegistrationRequest} from '../dto/user-registration-request';
import {LoginResponse} from '../dto/login-response';
import { LoginRequest } from '../dto/login-request';
import {reporteRquest} from '../dto/reporte-request';
import {CategoriaDTO} from '../dto/categoria-request';
import {CategoriaResponse} from '../dto/categoria-response';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:8080/api/auth/login";
  private urlRegistro = "http://localhost:8080/api/auth/register"
  private urlUsuario="http://localhost:8080/api/auth/perfil"
  private baseUrl = "http://localhost:8080/api/admin/categorias";
  private readonly id='';
  constructor(private http: HttpClient) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.urlRegistro}`, user);
  }
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}`, credentials).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem(this.id, response.usuario.id);
      })
    );
  }

  crearCategoria(categoria: CategoriaDTO): Observable<CategoriaResponse> {
    return this.http.post<CategoriaResponse>(this.baseUrl, categoria);
  }

  obtenerCategorias(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.baseUrl);
  }


  obtenerUsuario(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.urlUsuario}/${this.id}`);
  }
}
