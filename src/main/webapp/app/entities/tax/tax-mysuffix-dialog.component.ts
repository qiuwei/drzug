import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { TaxMysuffix } from './tax-mysuffix.model';
import { TaxMysuffixPopupService } from './tax-mysuffix-popup.service';
import { TaxMysuffixService } from './tax-mysuffix.service';

@Component({
    selector: 'jhi-tax-mysuffix-dialog',
    templateUrl: './tax-mysuffix-dialog.component.html'
})
export class TaxMysuffixDialogComponent implements OnInit {

    tax: TaxMysuffix;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private taxService: TaxMysuffixService,
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
        if (this.tax.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taxService.update(this.tax), false);
        } else {
            this.subscribeToSaveResponse(
                this.taxService.create(this.tax), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<TaxMysuffix>, isCreated: boolean) {
        result.subscribe((res: TaxMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TaxMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.tax.created'
            : 'drzugApp.tax.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'taxListModification', content: 'OK'});
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
    selector: 'jhi-tax-mysuffix-popup',
    template: ''
})
export class TaxMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxPopupService: TaxMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.taxPopupService
                    .open(TaxMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.taxPopupService
                    .open(TaxMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
