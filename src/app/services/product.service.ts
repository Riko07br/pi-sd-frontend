import { Injectable } from '@angular/core';
import { HttpAppService } from './http-app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductResponse } from '../models/product-response.model';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpAppService {
  protected override endpoint: string = '/products';

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
  }

  public findAll(
    pagination: Pagination
  ): Observable<Pageable<ProductResponse>> {
    return this.httpClient.get<Pageable<ProductResponse>>(this.getEndpoint(), {
      params: { ...pagination },
    });
  }

  public findById(id: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${this.getEndpoint()}/${id}`);
  }
}
