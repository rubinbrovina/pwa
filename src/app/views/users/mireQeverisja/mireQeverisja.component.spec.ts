/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MireQeverisjaComponent } from './mireQeverisja.component';

describe('MireQeverisjaComponent', () => {
  let component: MireQeverisjaComponent;
  let fixture: ComponentFixture<MireQeverisjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MireQeverisjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MireQeverisjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
