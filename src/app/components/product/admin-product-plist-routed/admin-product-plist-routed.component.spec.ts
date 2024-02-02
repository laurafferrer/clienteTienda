/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductPlistRoutedComponent } from './admin-product-plist-routed.component';

describe('AdminProductPlistRoutedComponent', () => {
  let component: AdminProductPlistRoutedComponent;
  let fixture: ComponentFixture<AdminProductPlistRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductPlistRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductPlistRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
