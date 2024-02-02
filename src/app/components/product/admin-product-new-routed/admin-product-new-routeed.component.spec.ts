/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductNewRouteedComponent } from './admin-product-new-routeed.component';

describe('AdminProductNewRouteedComponent', () => {
  let component: AdminProductNewRouteedComponent;
  let fixture: ComponentFixture<AdminProductNewRouteedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductNewRouteedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductNewRouteedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
