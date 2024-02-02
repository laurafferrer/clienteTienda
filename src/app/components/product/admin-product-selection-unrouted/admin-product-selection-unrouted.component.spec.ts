/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductSelectionUnroutedComponent } from './admin-product-selection-unrouted.component';

describe('AdminProductSelectionUnroutedComponent', () => {
  let component: AdminProductSelectionUnroutedComponent;
  let fixture: ComponentFixture<AdminProductSelectionUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductSelectionUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductSelectionUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
