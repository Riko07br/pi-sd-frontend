import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { JwtUser } from '../../models/jwt-user.model';
import { AuthService } from '../../services/auth.service';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: JwtUser;
  balance: number;
  hideNav: boolean = true;

  private userSubscription: Subscription;
  private urlChangeSubscription: Subscription;
  private balanceSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private balanceService: BalanceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlChangeSubscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.hideNav = event.url == '/';
      });

    this.balanceSubscription = this.balanceService.balance$.subscribe(
      (balance) => {
        this.balance = balance;
      }
    );

    this.userSubscription = this.authService.jwtUser$.subscribe((jwtUser) => {
      this.user = jwtUser;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.balanceSubscription?.unsubscribe();
    this.urlChangeSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
