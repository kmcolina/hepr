import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private fB: FormBuilder,
    // private formBuilder: FormBuilder,
              ) {
    this.loginForm = fB.group({
      mail: [''],
      password: [''],
    })
  }

  ngOnInit(): void { }

}
