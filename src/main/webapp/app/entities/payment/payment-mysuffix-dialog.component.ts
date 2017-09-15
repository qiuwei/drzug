import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { PaymentMysuffix } from './payment-mysuffix.model';
import { PaymentMysuffixPopupService } from './payment-mysuffix-popup.service';
import { PaymentMysuffixService } from './payment-mysuffix.service';

@Component({
    selector: 'jhi-payment-mysuffix-dialog',
    templateUrl: './payment-mysuffix-dialog.component.html'
})
export class PaymentMysuffixDialogComponent implements OnInit {

    payment: PaymentMysuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private paymentService: PaymentMysuffixService,
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
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentService.update(this.payment), false);
        } else {
            this.subscribeToSaveResponse(
                this.paymentService.create(this.payment), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<PaymentMysuffix>, isCreated: boolean) {
        result.subscribe((res: PaymentMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PaymentMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.payment.created'
            : 'drzugApp.payment.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'paymentListModification', content: 'OK'});
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
    selector: 'jhi-payment-mysuffix-popup',
    template: ''
})
export class PaymentMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.paymentPopupService
                    .open(PaymentMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.paymentPopupService
                    .open(PaymentMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
