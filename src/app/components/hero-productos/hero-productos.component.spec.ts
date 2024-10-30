import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProductosComponent } from './hero-productos.component';

describe('HeroProductosComponent', () => {
  let component: HeroProductosComponent;
  let fixture: ComponentFixture<HeroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
