import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OrderMysuffix } from './order-mysuffix.model';
import { OrderMysuffixService } from './order-mysuffix.service';
@Injectable()
export class OrderMysuffixPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private orderService: OrderMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.orderService.find(id).subscribe((order) => {
                order.createdAt = this.datePipe
                    .transform(order.createdAt, 'yyyy-MM-ddThh:mm');
                this.orderModalRef(component, order);
            });
        } else {
            return this.orderModalRef(component, new OrderMysuffix());
        }
    }

    orderModalRef(component: Component, order: OrderMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.order = order;
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
