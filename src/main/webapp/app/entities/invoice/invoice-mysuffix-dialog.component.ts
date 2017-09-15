import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceMysuffix } from './invoice-mysuffix.model';
import { InvoiceMysuffixPopupService } from './invoice-mysuffix-popup.service';
import { InvoiceMysuffixService } from './invoice-mysuffix.service';
import { CustomerMysuffix, CustomerMysuffixService } from '../customer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-invoice-mysuffix-dialog',
    templateUrl: './invoice-mysuffix-dialog.component.html'
})
export class InvoiceMysuffixDialogComponent implements OnInit {

    invoice: InvoiceMysuffix;
    isSaving: boolean;

    customers: CustomerMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private invoiceService: InvoiceMysuffixService,
        private customerService: CustomerMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: ResponseWrapper) => { this.customers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceMysuffix>) {
        result.subscribe((res: InvoiceMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceMysuffix) {
        this.eventManager.broadcast({ name: 'invoiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-mysuffix-popup',
    template: ''
})
export class InvoiceMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoicePopupService
                    .open(InvoiceMysuffixDialogComponent as Component, params['id']);
            } else {
                this.invoicePopupService
                    .open(InvoiceMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
