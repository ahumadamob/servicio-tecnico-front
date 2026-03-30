import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/api-base-url.token';
import {
  RepuestoCatalogoCreateRequestDto,
  RepuestoCatalogoDropdownResponseDto,
  RepuestoCatalogoListItemResponseDto,
  RepuestoCatalogoResponseDto,
  RepuestoCatalogoUpdateRequestDto,
  RepuestoModeloCompatibilidadCreateRequestDto,
  RepuestoModeloCompatibilidadResponseDto
} from '../models/repuesto-catalogo.model';

@Injectable({ providedIn: 'root' })
export class RepuestosCatalogoApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly baseUrl = `${this.apiBaseUrl}/api/repuestos-catalogo`;

  listar(): Observable<RepuestoCatalogoListItemResponseDto[]> {
    return this.http.get<RepuestoCatalogoListItemResponseDto[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<RepuestoCatalogoResponseDto> {
    return this.http.get<RepuestoCatalogoResponseDto>(`${this.baseUrl}/${id}`);
  }

  crear(payload: RepuestoCatalogoCreateRequestDto): Observable<RepuestoCatalogoResponseDto> {
    return this.http.post<RepuestoCatalogoResponseDto>(this.baseUrl, payload);
  }

  actualizar(id: number, payload: RepuestoCatalogoUpdateRequestDto): Observable<RepuestoCatalogoResponseDto> {
    return this.http.put<RepuestoCatalogoResponseDto>(`${this.baseUrl}/${id}`, payload);
  }

  desactivar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/desactivar`, {});
  }

  dropdownActivos(): Observable<RepuestoCatalogoDropdownResponseDto[]> {
    return this.http.get<RepuestoCatalogoDropdownResponseDto[]>(`${this.baseUrl}/dropdown`);
  }

  listarCompatibilidades(repuestoId: number): Observable<RepuestoModeloCompatibilidadResponseDto[]> {
    return this.http.get<RepuestoModeloCompatibilidadResponseDto[]>(`${this.baseUrl}/${repuestoId}/compatibilidades`);
  }

  agregarCompatibilidad(repuestoId: number, payload: RepuestoModeloCompatibilidadCreateRequestDto): Observable<RepuestoModeloCompatibilidadResponseDto> {
    return this.http.post<RepuestoModeloCompatibilidadResponseDto>(`${this.baseUrl}/${repuestoId}/compatibilidades`, payload);
  }

  desactivarCompatibilidad(repuestoId: number, compatibilidadId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${repuestoId}/compatibilidades/${compatibilidadId}/desactivar`, {});
  }
}
