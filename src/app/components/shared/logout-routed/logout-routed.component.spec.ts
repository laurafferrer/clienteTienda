import { LogoutRoutedComponent } from './logout-routed.component';

import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('LogoutRoutedComponent', () =>{
    let oLogoutRoutedComponent: LogoutRoutedComponent;
    let fixture: ComponentFixture<LogoutRoutedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LogoutRoutedComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutRoutedComponent);
        oLogoutRoutedComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(oLogoutRoutedComponent).toBeTruthy();
    });
})