import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  moduleId: module.id.toString(),
  selector: 'modal',
  styles: [require('./modal.style.scss')],
  template: require('./modal.template.html')
})

export class ModalComponent{
  @Output() opened = new EventEmitter();

  private _isOpen: boolean = false;

  public open(){
    this._isOpen = true;
  }

  public close(){
    this._isOpen = false;
  }

  public isOpen(){
    return this._isOpen;
  }
}

