import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionalidadComponent } from './funcionalidad.component';

describe('FuncionalidadComponent', () => {
  let component: FuncionalidadComponent;
  let fixture: ComponentFixture<FuncionalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
