/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FullViewOfShareComponent } from './fullViewOfShare.component';

describe('FullViewOfShareComponent', () => {
  let component: FullViewOfShareComponent;
  let fixture: ComponentFixture<FullViewOfShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullViewOfShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullViewOfShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
