/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserCategoryPlistRoutedComponent } from './user-category-plist-routed.component';

describe('UserCategoryPlistRoutedComponent', () => {
  let component: UserCategoryPlistRoutedComponent;
  let fixture: ComponentFixture<UserCategoryPlistRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCategoryPlistRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCategoryPlistRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
