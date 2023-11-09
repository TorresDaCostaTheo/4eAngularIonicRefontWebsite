import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleBateauPage } from './single-bateau.page';

describe('SingleBateauPage', () => {
  let component: SingleBateauPage;
  let fixture: ComponentFixture<SingleBateauPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleBateauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
