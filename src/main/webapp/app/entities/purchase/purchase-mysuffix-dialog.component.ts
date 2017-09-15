import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PurchaseMysuffix } from './purchase-mysuffix.model';
import { PurchaseMysuffixPopupService } from './purchase-mysuffix-popup.service';
import { PurchaseMysuffixService } from './purchase-mysuffix.service';

@Component({
    selector: 'jhi-purchase-mysuffix-dialog',
    templateUrl: './purchase-mysuffix-dialog.component.html'
})
export class PurchaseMysuffixDialogComponent implements OnInit {

    purchase: PurchaseMysuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private purchaseService: PurchaseMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.purchase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.purchaseService.update(this.purchase));
        } else {
            this.subscribeToSaveResponse(
                this.purchaseService.create(this.purchase));
        }
    }

    private subscribeToSaveResponse(result: Observable<PurchaseMysuffix>) {
        result.subscribe((res: PurchaseMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PurchaseMysuffix) {
        this.eventManager.broadcast({ name: 'purchaseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-purchase-mysuffix-popup',
    template: ''
})
export class PurchaseMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchasePopupService: PurchaseMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.purchasePopupService
                    .open(PurchaseMysuffixDialogComponent as Component, params['id']);
            } else {
                this.purchasePopupService
                    .open(PurchaseMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
