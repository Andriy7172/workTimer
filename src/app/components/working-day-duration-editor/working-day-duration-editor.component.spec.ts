import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDayDurationEditorComponent } from './working-day-duration-editor.component';

describe('WorkingDayDurationEditorComponent', () => {
  let component: WorkingDayDurationEditorComponent;
  let fixture: ComponentFixture<WorkingDayDurationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingDayDurationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDayDurationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
