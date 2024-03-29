import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-product-view-routed',
  templateUrl: './admin-product-view-routed.component.html',
  styleUrls: ['./admin-product-view-routed.component.css']
})
export class AdminProductViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get('id') || "1");
  }

  ngOnInit() {
  }

}
