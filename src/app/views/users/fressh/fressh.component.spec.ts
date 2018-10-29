/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FresshComponent } from './fressh.component';

describe('FresshComponent', () => {
  let component: FresshComponent;
  let fixture: ComponentFixture<FresshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FresshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FresshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
