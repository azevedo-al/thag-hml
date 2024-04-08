import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnderecoComponent } from './create-endereco.component';

describe('CreateEnderecoComponent', () => {
  let component: CreateEnderecoComponent;
  let fixture: ComponentFixture<CreateEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
