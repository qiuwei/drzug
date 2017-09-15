import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

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
    authorities: any[];
    isSaving: boolean;

    customers: CustomerMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private invoiceService: InvoiceMysuffixService,
        private customerService: CustomerMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
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
                this.invoiceService.update(this.invoice), false);
        } else {
            this.subscribeToSaveResponse(
                this.invoiceService.create(this.invoice), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceMysuffix>, isCreated: boolean) {
        result.subscribe((res: InvoiceMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: InvoiceMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.invoice.created'
            : 'drzugApp.invoice.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'invoiceListModification', content: 'OK'});
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

    trackCustomerById(index: number, item: CustomerMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-mysuffix-popup',
    template: ''
})
export class InvoiceMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.invoicePopupService
                    .open(InvoiceMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.invoicePopupService
                    .open(InvoiceMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
