import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private isOpenPopupSubject = new BehaviorSubject<boolean>(false);
  private isOpenWarningSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();
  isOpenPopup$ = this.isOpenPopupSubject.asObservable();
  isOpenWarning$ = this.isOpenWarningSubject.asObservable();

  openMenu() {
    this.isOpenSubject.next(true);
  }

  closeMenu() {
    this.isOpenSubject.next(false);
  }

  openPopup() {
    this.isOpenPopupSubject.next(true);
  }

  closePopup() {
    this.isOpenPopupSubject.next(false);
  }

  openWarning() {
    this.isOpenWarningSubject.next(true);
  }

  closeWarning() {
    this.isOpenWarningSubject.next(false);
  }
} 
