import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRealisationComponent } from './detail-realisation.component';

describe('DetailRealisationComponent', () => {
  let component: DetailRealisationComponent;
  let fixture: ComponentFixture<DetailRealisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRealisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
