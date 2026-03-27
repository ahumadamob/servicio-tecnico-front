import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/api-base-url.token';
import {
  TipoRepuestoCreateRequestDto,
  TipoRepuestoDropdownResponseDto,
  TipoRepuestoListItemResponseDto,
  TipoRepuestoResponseDto,
  TipoRepuestoUpdateRequestDto
} from '../models/tipo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class TiposRepuestoApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly baseUrl = `${this.apiBaseUrl}/api/tipos-repuesto`;

  listar(): Observable<TipoRepuestoListItemResponseDto[]> {
    return this.http.get<TipoRepuestoListItemResponseDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<TipoRepuestoResponseDto> {
    return this.http.get<TipoRepuestoResponseDto>(`${this.baseUrl}/${id}`);
  }

  crear(payload: TipoRepuestoCreateRequestDto): Observable<TipoRepuestoResponseDto> {
    return this.http.post<TipoRepuestoResponseDto>(this.baseUrl, payload);
  }

  actualizar(id: number, payload: TipoRepuestoUpdateRequestDto): Observable<TipoRepuestoResponseDto> {
    return this.http.put<TipoRepuestoResponseDto>(`${this.baseUrl}/${id}`, payload);
  }

  desactivar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/desactivar`, {});
  }

  dropdownActivos(): Observable<TipoRepuestoDropdownResponseDto[]> {
    return this.http.get<TipoRepuestoDropdownResponseDto[]>(`${this.baseUrl}/dropdown`);
  }
}
