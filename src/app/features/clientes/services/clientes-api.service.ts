import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/api-base-url.token';
import { ClienteListItemResponseDto, ClienteResponseDto, ClienteUpsertRequestDto } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClientesApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly baseUrl = `${this.apiBaseUrl}/api/clientes`;

  listar(): Observable<ClienteListItemResponseDto[]> {
    return this.http.get<ClienteListItemResponseDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<ClienteResponseDto> {
    return this.http.get<ClienteResponseDto>(`${this.baseUrl}/${id}`);
  }

  crear(payload: ClienteUpsertRequestDto): Observable<ClienteResponseDto> {
    return this.http.post<ClienteResponseDto>(this.baseUrl, payload);
  }

  actualizar(id: number, payload: ClienteUpsertRequestDto): Observable<ClienteResponseDto> {
    return this.http.put<ClienteResponseDto>(`${this.baseUrl}/${id}`, payload);
  }

  desactivar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/desactivar`, {});
  }
}
