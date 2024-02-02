/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductDetailUnroutedComponent } from './admin-product-detail-unrouted.component';

describe('AdminProductDetailUnroutedComponent', () => {
  let component: AdminProductDetailUnroutedComponent;
  let fixture: ComponentFixture<AdminProductDetailUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductDetailUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductDetailUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
