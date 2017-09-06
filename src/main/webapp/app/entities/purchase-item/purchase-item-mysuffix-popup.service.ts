import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseItemMysuffix } from './purchase-item-mysuffix.model';
import { PurchaseItemMysuffixService } from './purchase-item-mysuffix.service';
@Injectable()
export class PurchaseItemMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private purchaseItemService: PurchaseItemMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.purchaseItemService.find(id).subscribe((purchaseItem) => {
                this.purchaseItemModalRef(component, purchaseItem);
            });
        } else {
            return this.purchaseItemModalRef(component, new PurchaseItemMysuffix());
        }
    }

    purchaseItemModalRef(component: Component, purchaseItem: PurchaseItemMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.purchaseItem = purchaseItem;
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
