import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/config/api-base-url.token';
import { TecnicoDropdownResponseDto } from '../models/dropdown.model';

@Injectable({ providedIn: 'root' })
export class TecnicosDropdownService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  listarTecnicosActivos(): Observable<TecnicoDropdownResponseDto[]> {
    return this.http.get<TecnicoDropdownResponseDto[]>(`${this.apiBaseUrl}/api/tecnicos/dropdown`);
  }
}
