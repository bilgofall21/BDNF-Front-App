import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationUserComponent } from './realisation-user.component';

describe('RealisationUserComponent', () => {
  let component: RealisationUserComponent;
  let fixture: ComponentFixture<RealisationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisationUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealisationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
