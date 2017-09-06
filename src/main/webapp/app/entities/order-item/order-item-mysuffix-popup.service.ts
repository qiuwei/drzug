import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrderItemMysuffix } from './order-item-mysuffix.model';
import { OrderItemMysuffixService } from './order-item-mysuffix.service';
@Injectable()
export class OrderItemMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private orderItemService: OrderItemMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.orderItemService.find(id).subscribe((orderItem) => {
                this.orderItemModalRef(component, orderItem);
            });
        } else {
            return this.orderItemModalRef(component, new OrderItemMysuffix());
        }
    }

    orderItemModalRef(component: Component, orderItem: OrderItemMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.orderItem = orderItem;
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
