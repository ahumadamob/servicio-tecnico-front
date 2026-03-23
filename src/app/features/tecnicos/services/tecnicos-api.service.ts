import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/api-base-url.token';
import {
  TecnicoDropdownResponseDto,
  TecnicoListItemResponseDto,
  TecnicoResponseDto,
  TecnicoUpsertRequestDto
} from '../models/tecnico.model';

@Injectable({ providedIn: 'root' })
export class TecnicosApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly baseUrl = `${this.apiBaseUrl}/api/tecnicos`;

  listar(): Observable<TecnicoListItemResponseDto[]> {
    return this.http.get<TecnicoListItemResponseDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<TecnicoResponseDto> {
    return this.http.get<TecnicoResponseDto>(`${this.baseUrl}/${id}`);
  }

  crear(payload: TecnicoUpsertRequestDto): Observable<TecnicoResponseDto> {
    return this.http.post<TecnicoResponseDto>(this.baseUrl, payload);
  }

  actualizar(id: number, payload: TecnicoUpsertRequestDto): Observable<TecnicoResponseDto> {
    return this.http.put<TecnicoResponseDto>(`${this.baseUrl}/${id}`, payload);
  }

  desactivar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/desactivar`, {});
  }

  dropdownActivos(): Observable<TecnicoDropdownResponseDto[]> {
    return this.http.get<TecnicoDropdownResponseDto[]>(`${this.baseUrl}/dropdown`);
  }
}
