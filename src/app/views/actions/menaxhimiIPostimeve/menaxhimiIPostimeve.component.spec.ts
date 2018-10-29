/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { menaxhimiIPostimeve } from './menaxhimiIPostimeve.component';

describe('ApproveCommentsComponent', () => {
  let component: menaxhimiIPostimeve;
  let fixture: ComponentFixture<menaxhimiIPostimeve>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ menaxhimiIPostimeve ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(menaxhimiIPostimeve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
