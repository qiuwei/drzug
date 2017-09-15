import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderMysuffix } from './order-mysuffix.model';
import { OrderMysuffixPopupService } from './order-mysuffix-popup.service';
import { OrderMysuffixService } from './order-mysuffix.service';

@Component({
    selector: 'jhi-order-mysuffix-delete-dialog',
    templateUrl: './order-mysuffix-delete-dialog.component.html'
})
export class OrderMysuffixDeleteDialogComponent {

    order: OrderMysuffix;

    constructor(
        private orderService: OrderMysuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderListModification',
                content: 'Deleted an order'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-mysuffix-delete-popup',
    template: ''
})
export class OrderMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderPopupService
                .open(OrderMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
