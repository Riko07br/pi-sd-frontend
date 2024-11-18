import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionResponse } from '../../../models/transaction-response.model';
import { TransactionService } from '../../../services/transaction.service';
import { Pageable } from '../../../models/pageable.model';
import { TransferDetailComponent } from './transfer-detail/transfer-detail.component';
import { Subscription } from 'rxjs';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    TransferDetailComponent,
    PaginationComponent,
  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit, OnDestroy {
  transactionPageable: Pageable<TransactionResponse>;
  selectedTransaction: TransactionResponse;

  currentPage: number = 1;
  totalPages: number = 1;

  subscription: Subscription;
  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      const page = +params['page'] - 1 || 0;
      this.transactionService
        .findAll({ page, size: 5 })
        .subscribe((pageable) => {
          this.transactionPageable = pageable;
          this.currentPage = pageable.number + 1;
          this.totalPages = pageable.totalPages;
        });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.onCloseTransaction();
  }

  onSelectTransaction(transaction: TransactionResponse) {
    this.selectedTransaction = transaction;
  }
  onCloseTransaction() {
    this.selectedTransaction = null;
  }
}
