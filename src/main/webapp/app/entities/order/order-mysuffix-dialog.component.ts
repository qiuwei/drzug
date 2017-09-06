import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { OrderMysuffix } from './order-mysuffix.model';
import { OrderMysuffixPopupService } from './order-mysuffix-popup.service';
import { OrderMysuffixService } from './order-mysuffix.service';

@Component({
    selector: 'jhi-order-mysuffix-dialog',
    templateUrl: './order-mysuffix-dialog.component.html'
})
export class OrderMysuffixDialogComponent implements OnInit {

    order: OrderMysuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private orderService: OrderMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderService.update(this.order), false);
        } else {
            this.subscribeToSaveResponse(
                this.orderService.create(this.order), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderMysuffix>, isCreated: boolean) {
        result.subscribe((res: OrderMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: OrderMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.order.created'
            : 'drzugApp.order.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'orderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-order-mysuffix-popup',
    template: ''
})
export class OrderMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.orderPopupService
                    .open(OrderMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.orderPopupService
                    .open(OrderMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
