import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-product-plist-routed',
  templateUrl: './user-product-plist-routed.component.html',
  styleUrls: ['./user-product-plist-routed.component.css']
})
export class UserProductPlistRoutedComponent implements OnInit {

  oForceReload: Subject<boolean> = new Subject<boolean>();
  oCategoryId: number;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { 
    this.oCategoryId = parseInt(this.oActivatedRoute.snapshot.paramMap.get('category_id') || '0');
  }

  ngOnInit() {
  }

}
