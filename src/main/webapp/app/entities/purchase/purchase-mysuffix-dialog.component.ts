import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { PurchaseMysuffix } from './purchase-mysuffix.model';
import { PurchaseMysuffixPopupService } from './purchase-mysuffix-popup.service';
import { PurchaseMysuffixService } from './purchase-mysuffix.service';

@Component({
    selector: 'jhi-purchase-mysuffix-dialog',
    templateUrl: './purchase-mysuffix-dialog.component.html'
})
export class PurchaseMysuffixDialogComponent implements OnInit {

    purchase: PurchaseMysuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private purchaseService: PurchaseMysuffixService,
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
        if (this.purchase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.purchaseService.update(this.purchase), false);
        } else {
            this.subscribeToSaveResponse(
                this.purchaseService.create(this.purchase), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<PurchaseMysuffix>, isCreated: boolean) {
        result.subscribe((res: PurchaseMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PurchaseMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.purchase.created'
            : 'drzugApp.purchase.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'purchaseListModification', content: 'OK'});
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
    selector: 'jhi-purchase-mysuffix-popup',
    template: ''
})
export class PurchaseMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchasePopupService: PurchaseMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.purchasePopupService
                    .open(PurchaseMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.purchasePopupService
                    .open(PurchaseMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
