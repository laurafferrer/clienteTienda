/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductFormUnroutedComponent } from './admin-product-form-unrouted.component';

describe('AdminProductFormUnroutedComponent', () => {
  let component: AdminProductFormUnroutedComponent;
  let fixture: ComponentFixture<AdminProductFormUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductFormUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductFormUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
