import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimResponse } from '../../model/claim.models';

@Component({
  selector: 'app-claim-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-alert-dialog.component.html',
  styleUrl: './claim-alert-dialog.component.scss'
})
export class ClaimAlertDialogComponent {
  @Input() claim: ClaimResponse | null = null;
  @Output() close = new EventEmitter<void>();
}