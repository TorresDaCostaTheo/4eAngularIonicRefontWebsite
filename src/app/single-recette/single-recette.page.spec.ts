import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleRecettePage } from './single-recette.page';

describe('SingleRecettePage', () => {
  let component: SingleRecettePage;
  let fixture: ComponentFixture<SingleRecettePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleRecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
