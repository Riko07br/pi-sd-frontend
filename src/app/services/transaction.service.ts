import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionResponse } from '../models/transaction-response.model';
import { HttpAppService } from './http-app.service';
import { TransactionRequest } from '../models/transaction-request.model';
import { Pageable } from '../models/pageable.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends HttpAppService {
  protected override endpoint: string = '/transactions';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public findAll(
    pagination: Pagination
  ): Observable<Pageable<TransactionResponse>> {
    return this.httpClient.get<Pageable<TransactionResponse>>(
      this.getEndpoint(),
      {
        params: {
          ...pagination,
        },
      }
    );
  }

  public findById(id: number): Observable<TransactionResponse> {
    return this.httpClient.get<TransactionResponse>(
      `${this.getEndpoint()}/${id}`
    );
  }

  public create(
    transactionRequest: TransactionRequest
  ): Observable<TransactionResponse> {
    return this.httpClient.post<TransactionResponse>(
      this.getEndpoint(),
      transactionRequest
    );
  }
}
