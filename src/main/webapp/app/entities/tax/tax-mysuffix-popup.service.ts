import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaxMysuffix } from './tax-mysuffix.model';
import { TaxMysuffixService } from './tax-mysuffix.service';
@Injectable()
export class TaxMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private taxService: TaxMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.taxService.find(id).subscribe((tax) => {
                this.taxModalRef(component, tax);
            });
        } else {
            return this.taxModalRef(component, new TaxMysuffix());
        }
    }

    taxModalRef(component: Component, tax: TaxMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tax = tax;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
