import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceItemMysuffix } from './invoice-item-mysuffix.model';
import { InvoiceItemMysuffixService } from './invoice-item-mysuffix.service';
@Injectable()
export class InvoiceItemMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private invoiceItemService: InvoiceItemMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.invoiceItemService.find(id).subscribe((invoiceItem) => {
                this.invoiceItemModalRef(component, invoiceItem);
            });
        } else {
            return this.invoiceItemModalRef(component, new InvoiceItemMysuffix());
        }
    }

    invoiceItemModalRef(component: Component, invoiceItem: InvoiceItemMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceItem = invoiceItem;
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
