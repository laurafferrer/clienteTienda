/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserCategoryPlistUnroutedComponent } from './user-category-plist-unrouted.component';

describe('UserCategoryPlistUnroutedComponent', () => {
  let component: UserCategoryPlistUnroutedComponent;
  let fixture: ComponentFixture<UserCategoryPlistUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCategoryPlistUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCategoryPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
