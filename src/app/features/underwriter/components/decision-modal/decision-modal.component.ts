import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-decision-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './decision-modal.component.html',
  styleUrl: './decision-modal.component.scss'
})
export class DecisionModalComponent {
  @Input({ required: true }) applicationId!: number;
  @Input({ required: true }) decisionType: 'APPROVE' | 'REJECT' = 'APPROVE';

  @Output() confirmed = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  decisionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.decisionForm = this.fb.group({
      remarks: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit(): void {
    if (this.decisionForm.valid) {
      this.confirmed.emit(this.decisionForm.value.remarks);
    } else {
      this.decisionForm.markAllAsTouched();
    }
  }

  close(): void {
    this.cancelled.emit();
  }
}