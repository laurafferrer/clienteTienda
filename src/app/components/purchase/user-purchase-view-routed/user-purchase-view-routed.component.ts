import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-purchase-view-routed',
  templateUrl: './user-purchase-view-routed.component.html',
  styleUrls: ['./user-purchase-view-routed.component.css']
})
export class UserPurchaseViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor( private oActivatedRoute: ActivatedRoute ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get('id') || "1");
  }

  ngOnInit() {
  }

}
