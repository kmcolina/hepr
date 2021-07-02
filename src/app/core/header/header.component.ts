import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  validatingForm!: FormGroup;
  // @ts-ignore
  modalRef: MDBModalRef;
  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(ModalComponent)
  }

}
