/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductPlistUnroutedComponent } from './admin-product-plist-unrouted.component';

describe('AdminProductPlistUnroutedComponent', () => {
  let component: AdminProductPlistUnroutedComponent;
  let fixture: ComponentFixture<AdminProductPlistUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductPlistUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
