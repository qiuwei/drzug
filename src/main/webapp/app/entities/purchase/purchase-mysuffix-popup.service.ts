import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PurchaseMysuffix } from './purchase-mysuffix.model';
import { PurchaseMysuffixService } from './purchase-mysuffix.service';
@Injectable()
export class PurchaseMysuffixPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private purchaseService: PurchaseMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.purchaseService.find(id).subscribe((purchase) => {
                purchase.createdAt = this.datePipe
                    .transform(purchase.createdAt, 'yyyy-MM-ddThh:mm');
                this.purchaseModalRef(component, purchase);
            });
        } else {
            return this.purchaseModalRef(component, new PurchaseMysuffix());
        }
    }

    purchaseModalRef(component: Component, purchase: PurchaseMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.purchase = purchase;
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
