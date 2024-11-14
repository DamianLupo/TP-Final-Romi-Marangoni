import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';

@Component({
  selector: 'app-pop-up-warning',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './pop-up-warning.component.html',
  styleUrl: './pop-up-warning.component.css'
})
export class PopUpWarningComponent {
  isOpen : boolean = false;
  @Input() type: string = '';
  @Output() confirm: EventEmitter<string> = new EventEmitter<string>();
  closeWarning = inject(MenuStateService);


  ngOnInit() {
    this.closeWarning.isOpenWarning$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  confirmAction() {
    this.confirm.emit(this.type);
    this.isOpen = false;
    this.closeWarning.closeWarning();
  }

  cancelAction() {
    this.isOpen = false;
    this.closeWarning.closeWarning();
  }
}
