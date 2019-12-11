import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../libraries/services/contact/contact.service';
import { ContactModel } from '../../libraries/entities/app/contact.model';
import { ApiResponse } from '../../libraries/entities/common/stdresp.model';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //===||
  private isLoading = false;
  private contactModelList: ContactModel[];

  //===||
  contactForm: FormGroup;
  isFormMode = 0;
  isFormSubmit = false;

  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phone: string;
  status: string;

  //===||
  closeResult: string;
  modalOptions: NgbModalOptions;
  modalTitle: string;

  //===||
  constructor(private _contactService: ContactService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  //===||
  ngOnInit() {
    this.createForm();
    this.defaultData();
    this.getContactList();
  }

  //===||
  private getContactList() {
    this.isLoading = true;
    this._contactService.list()
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          this.contactModelList = _apiResponse.data as ContactModel[];
        }
        ;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  //===||
  createForm() {
    this.contactForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      city: [this.city],
      email: [this.email, [Validators.required, Validators.email]],
      phone: [this.phone, [Validators.required, Validators.minLength(6)]],
      status: [this.status],
    });
  }

  //===||
  defaultData() {
    this.contactForm.setValue({
      firstName: "Abc",
      lastName: "Xyz",
      city: "Pune",
      email: "abc@gmail.com",
      phone: "9876543210",
      status: "0"
    });
  }

  //===||
  get f() { return this.contactForm.controls; }

  //===||
  onSubmit() {
    this.isFormSubmit = true;

    //===||
    if (this.contactForm.invalid) {
      return;
    }

    console.log(this.contactForm.value);

    let _contactModal = new ContactModel();
    _contactModal.FirstName = this.contactForm.value.firstName;
    _contactModal.LastName = this.contactForm.value.lastName;
    _contactModal.City = this.contactForm.value.city;
    _contactModal.Email = this.contactForm.value.email;
    _contactModal.Phone = this.contactForm.value.phone;
    _contactModal.Status = (this.contactForm.value.status == "1" ? true : false);

    this.isLoading = true;
    this._contactService.create(_contactModal)
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          alert("Contact added successfully.");
        }
        this.isLoading = false;
        this.getContactList();
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        alert("Something went wrong, please try after some time.");
        this.modalService.dismissAll();
        this.isLoading = false;
      });
  }

  //===||
  onReset() {
    this.isFormSubmit = false;
    this.contactForm.reset();
  }

  //===||
  statusChange(event) {
    this.contactForm.patchValue({
      status: event.target.checked == true ? "1" : "0"
    });
  }

  //===||
  viewContact(content, size, title: string, id : number) {
    this.isFormMode = 0;
    this.modalOpen(content, size, title);
    this.isLoading = true;
    this._contactService.view(id)
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          alert("Contact added successfully.");
        }
        this.isLoading = false;
        this.getContactList();
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        alert("Something went wrong, please try after some time.");
        this.modalService.dismissAll();
        this.isLoading = false;
      });
  }

  //===||
  addContact(content, size, title: string) {
    this.isFormMode = 1;
    this.modalOpen(content, size, title);
  }

  //===||
  editContact(content, size, title: string, id : number) {
    this.isFormMode = 2;
    this.modalOpen(content, size, title);
  }

  //===||
  deleteContact(content, size, title: string, id : number) {
    this.isFormMode = 0;
    this.modalOpen(content, size, title);
  }

  //===||
  modalOpen(content, size, title: string) {
    this.modalTitle = title;
    this.modalOptions.size = size;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //===||
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }
}
