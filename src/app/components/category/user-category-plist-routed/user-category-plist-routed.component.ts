import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-category-plist-routed',
  templateUrl: './user-category-plist-routed.component.html',
  styleUrls: ['./user-category-plist-routed.component.css']
})
export class UserCategoryPlistRoutedComponent implements OnInit {

  oForceReload: Subject<Boolean> = new Subject<Boolean>();

  constructor(
    private oActivadedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
