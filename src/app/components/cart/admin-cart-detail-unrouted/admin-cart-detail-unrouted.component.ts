import { Component, Input, OnInit, Optional } from '@angular/core';
import { ICart } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { CartAjaxService } from '../../../service/cart.ajax.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-cart-detail-unrouted',
  templateUrl: './admin-cart-detail-unrouted.component.html',
  styleUrls: ['./admin-cart-detail-unrouted.component.css']
})
export class AdminCartDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oCart: ICart = {} as ICart;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oCartAjaxService: CartAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
   }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oCartAjaxService.getCartById(this.id).subscribe({
      next: (data: ICart) => {
        this.oCart = data;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
