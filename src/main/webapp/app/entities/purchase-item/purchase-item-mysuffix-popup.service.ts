import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseItemMysuffix } from './purchase-item-mysuffix.model';
import { PurchaseItemMysuffixService } from './purchase-item-mysuffix.service';

@Injectable()
export class PurchaseItemMysuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private purchaseItemService: PurchaseItemMysuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.purchaseItemService.find(id).subscribe((purchaseItem) => {
                    this.ngbModalRef = this.purchaseItemModalRef(component, purchaseItem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.purchaseItemModalRef(component, new PurchaseItemMysuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    purchaseItemModalRef(component: Component, purchaseItem: PurchaseItemMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.purchaseItem = purchaseItem;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
