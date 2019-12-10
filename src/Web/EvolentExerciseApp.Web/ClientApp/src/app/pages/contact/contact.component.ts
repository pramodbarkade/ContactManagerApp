import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../libraries/services/contact/contact.service';
import { ContactModel } from '../../libraries/entities/app/contact.model';
import { ApiResponse } from '../../libraries/entities/common/stdresp.model';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string;
  modalOptions: NgbModalOptions;
  modalTitle : string;
  //===||
  constructor(private _contact: ContactService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  //===||
  ngOnInit() {
    this.getContactList();
  }

  //===||
  private getContactList() {
    this.isLoading = true;
    this._contact.getList()
      .subscribe((_apiResponse: ApiResponse) => {
        if (_apiResponse.status) {
          this.contactModelList = _apiResponse.data as ContactModel[];
        };
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  //===||
  open(content, size, title : string) {  
console.log(title);
    this.modalTitle =  title;
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
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
