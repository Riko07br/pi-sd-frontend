import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransactionResponse } from '../../../../models/transaction-response.model';
import { AuthService } from '../../../../services/auth.service';
import { JwtUser } from '../../../../models/jwt-user.model';
import { AccountResponse } from '../../../../models/account-response.model';
import { AccountService } from '../../../../services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-detail',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './transfer-detail.component.html',
  styleUrl: './transfer-detail.component.css',
})
export class TransferDetailComponent implements OnInit, OnDestroy {
  @Input() transaction: TransactionResponse;
  account: AccountResponse;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.jwtUser$.subscribe((jwtuser) => {
      this.accountService.findById(jwtuser.accountId).subscribe((account) => {
        this.account = account;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
