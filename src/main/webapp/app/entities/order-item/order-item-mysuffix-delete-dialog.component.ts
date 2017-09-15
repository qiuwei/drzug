import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderItemMysuffix } from './order-item-mysuffix.model';
import { OrderItemMysuffixPopupService } from './order-item-mysuffix-popup.service';
import { OrderItemMysuffixService } from './order-item-mysuffix.service';

@Component({
    selector: 'jhi-order-item-mysuffix-delete-dialog',
    templateUrl: './order-item-mysuffix-delete-dialog.component.html'
})
export class OrderItemMysuffixDeleteDialogComponent {

    orderItem: OrderItemMysuffix;

    constructor(
        private orderItemService: OrderItemMysuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.orderItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderItemListModification',
                content: 'Deleted an orderItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-item-mysuffix-delete-popup',
    template: ''
})
export class OrderItemMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderItemPopupService
                .open(OrderItemMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
