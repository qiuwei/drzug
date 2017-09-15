import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PaymentMysuffix } from './payment-mysuffix.model';
import { PaymentMysuffixService } from './payment-mysuffix.service';
@Injectable()
export class PaymentMysuffixPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private paymentService: PaymentMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.paymentService.find(id).subscribe((payment) => {
                payment.date = this.datePipe
                    .transform(payment.date, 'yyyy-MM-ddThh:mm');
                this.paymentModalRef(component, payment);
            });
        } else {
            return this.paymentModalRef(component, new PaymentMysuffix());
        }
    }

    paymentModalRef(component: Component, payment: PaymentMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.payment = payment;
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
