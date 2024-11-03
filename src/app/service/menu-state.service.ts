import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  openMenu() {
    this.isOpenSubject.next(true);
  }

  closeMenu() {
    this.isOpenSubject.next(false);
  }
} 