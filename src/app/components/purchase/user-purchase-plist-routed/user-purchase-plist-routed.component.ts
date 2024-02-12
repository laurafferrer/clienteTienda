import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-purchase-plist-routed',
  templateUrl: './user-purchase-plist-routed.component.html',
  styleUrls: ['./user-purchase-plist-routed.component.css']
})
export class UserPurchasePlistRoutedComponent implements OnInit {

  oForceReload: Subject<boolean> = new Subject<boolean>();
  oUserId: number;

  constructor(
    private oActivadRoute: ActivatedRoute
  ) { 
    this.oUserId = parseInt(this.oActivadRoute.snapshot.paramMap.get('id') || "0");
  }

  ngOnInit() {
  }

}
