import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuStateService } from '../../service/menu-state.service';

@Component({
  selector: 'app-pop-up-add',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './pop-up-add.component.html',
  styleUrl: './pop-up-add.component.css'
})
export class PopUpAddComponent {
    menuStateService = inject(MenuStateService);
    isOpen: boolean = false;
    ngOnInit(): void {
        this.menuStateService.isOpenPopup$.subscribe(isOpen => {
            this.isOpen = isOpen;
        });
        console.log(this.isOpen);
        console.log(this.menuStateService.isOpenPopup$);
    }
    togglePopUp() {
        this.menuStateService.closePopup();
        console.log(this.isOpen);
    }
}
