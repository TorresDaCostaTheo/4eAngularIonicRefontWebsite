import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleRestaurantPage } from './single-restaurant.page';

describe('SingleRestaurantPage', () => {
  let component: SingleRestaurantPage;
  let fixture: ComponentFixture<SingleRestaurantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleRestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
