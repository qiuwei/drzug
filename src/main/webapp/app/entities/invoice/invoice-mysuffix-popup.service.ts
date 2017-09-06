import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { InvoiceMysuffix } from './invoice-mysuffix.model';
import { InvoiceMysuffixService } from './invoice-mysuffix.service';
@Injectable()
export class InvoiceMysuffixPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private invoiceService: InvoiceMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.invoiceService.find(id).subscribe((invoice) => {
                invoice.createAt = this.datePipe
                    .transform(invoice.createAt, 'yyyy-MM-ddThh:mm');
                this.invoiceModalRef(component, invoice);
            });
        } else {
            return this.invoiceModalRef(component, new InvoiceMysuffix());
        }
    }

    invoiceModalRef(component: Component, invoice: InvoiceMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoice = invoice;
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
