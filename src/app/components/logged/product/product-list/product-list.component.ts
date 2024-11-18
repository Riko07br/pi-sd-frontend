import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pageable } from '../../../../models/pageable.model';
import { ProductResponse } from '../../../../models/product-response.model';
import { ProductService } from '../../../../services/product.service';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  productPageable: Pageable<ProductResponse> = new Pageable<ProductResponse>();
  subscription: Subscription;

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      const page = +params['page'] - 1 || 0;
      this.productService.findAll({ page, size: 5 }).subscribe((pageable) => {
        this.productPageable = pageable;
        this.currentPage = pageable.number + 1;
        this.totalPages = pageable.totalPages;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
