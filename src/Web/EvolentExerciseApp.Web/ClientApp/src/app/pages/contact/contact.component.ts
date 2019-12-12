import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../libraries/services/contact/contact.service';
import { ContactModel } from '../../libraries/entities/app/contact.model';
import { ApiResponse } from '../../libraries/entities/common/stdresp.model';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactStatusModel } from 'src/app/libraries/entities/app/contactstatus.model';
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
  isFormId = 0;
  isFormStatus = false;
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
    //this.defaultData();
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

    let _contactModal = new ContactModel();
    if(this.isFormMode == 2)
    {
      _contactModal.id = this.isFormId;
    }
    _contactModal.firstName = this.contactForm.value.firstName;
    _contactModal.lastName = this.contactForm.value.lastName;
    _contactModal.city = this.contactForm.value.city;
    _contactModal.email = this.contactForm.value.email;
    _contactModal.phone = this.contactForm.value.phone;
    _contactModal.status = (this.contactForm.value.status == "1" ? true : false);
    console.log(_contactModal);

    this.isLoading = true;
    if(this.isFormMode == 2)
    {
      this._contactService.update(_contactModal)
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          alert("Contact updated successfully.");
        }
        else {
          alert(_apiResponse.message);
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
    else 
    {
    this._contactService.create(_contactModal)
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          alert("Contact added successfully.");
        }
        else {
          alert(_apiResponse.message);
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
  }

  //===||
  onStatus() 
  {       
    if(this.isFormMode == 4)
    {     
      this.isLoading = true;   
      
      let _contactStatusModel = new ContactStatusModel();     
      _contactStatusModel.id = this.isFormId;      
      _contactStatusModel.status = !this.isFormStatus;
console.log(_contactStatusModel);
      this._contactService.status(_contactStatusModel)
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          alert("Contact status updated successfully.");
        }
        else {
          alert(_apiResponse.message);
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
  }

  //===||
  onDelete() 
  {   
    console.log(this.isFormMode, this.isFormId);
    if(this.isFormMode == 3)
    {     
      this.isLoading = true;    
      this._contactService.delete(this.isFormId)
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          alert("Contact deleted successfully.");
        }
        else {
          alert(_apiResponse.message);
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
  }

  loadData(content, size, title:string, id : number)
  {
    this._contactService.view(id)
      .subscribe((_apiResponse: ApiResponse) => {        
        if (_apiResponse.status) {
          let _contactModal = _apiResponse.data as ContactModel;          
          this.contactForm.setValue({
            firstName: _contactModal.firstName,
            lastName: _contactModal.lastName,
            city: _contactModal.city,
            email: _contactModal.email,
            phone: _contactModal.phone,
            status: _contactModal.status == true ? "1" : "0",
          });
        }
        this.isLoading = false;   
        this.modalOpen(content, size, title);
      }, err => {
        console.log(err);
        alert("Something went wrong, please try after some time.");       
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
  addContact(content, size, title: string) {
    this.contactForm.reset();  
    this.isFormMode = 1;
    this.isFormId = 0;
    this.modalOpen(content, size, title);
  }

  //===||
  viewEditContact(content, size, title: string, id: number, mode : number) {
    this.contactForm.reset();      
    this.isFormMode = mode;
    this.isFormId = id;
    this.loadData(content, size, title, id); 
  }

  //===||
  deleteContact(content, size, title: string, id: number) {
    this.isFormMode = 3;
    this.isFormId = id;
    this.modalOpen(content, size, title);
  }

   //===||
  statusContact(content, size, title: string, id: number, status : boolean) {
    this.isFormMode = 4;
    this.isFormId = id;
    this.isFormStatus = status;
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
