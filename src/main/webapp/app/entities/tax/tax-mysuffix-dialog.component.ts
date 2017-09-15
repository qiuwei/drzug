import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TaxMysuffix } from './tax-mysuffix.model';
import { TaxMysuffixPopupService } from './tax-mysuffix-popup.service';
import { TaxMysuffixService } from './tax-mysuffix.service';

@Component({
    selector: 'jhi-tax-mysuffix-dialog',
    templateUrl: './tax-mysuffix-dialog.component.html'
})
export class TaxMysuffixDialogComponent implements OnInit {

    tax: TaxMysuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private taxService: TaxMysuffixService,
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
        if (this.tax.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taxService.update(this.tax));
        } else {
            this.subscribeToSaveResponse(
                this.taxService.create(this.tax));
        }
    }

    private subscribeToSaveResponse(result: Observable<TaxMysuffix>) {
        result.subscribe((res: TaxMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TaxMysuffix) {
        this.eventManager.broadcast({ name: 'taxListModification', content: 'OK'});
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
    selector: 'jhi-tax-mysuffix-popup',
    template: ''
})
export class TaxMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxPopupService: TaxMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taxPopupService
                    .open(TaxMysuffixDialogComponent as Component, params['id']);
            } else {
                this.taxPopupService
                    .open(TaxMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
