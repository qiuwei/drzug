import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { InvoiceItemMysuffix } from './invoice-item-mysuffix.model';
import { InvoiceItemMysuffixPopupService } from './invoice-item-mysuffix-popup.service';
import { InvoiceItemMysuffixService } from './invoice-item-mysuffix.service';
import { InvoiceMysuffix, InvoiceMysuffixService } from '../invoice';
import { ProductMysuffix, ProductMysuffixService } from '../product';
import { TaxMysuffix, TaxMysuffixService } from '../tax';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-invoice-item-mysuffix-dialog',
    templateUrl: './invoice-item-mysuffix-dialog.component.html'
})
export class InvoiceItemMysuffixDialogComponent implements OnInit {

    invoiceItem: InvoiceItemMysuffix;
    authorities: any[];
    isSaving: boolean;

    invoices: InvoiceMysuffix[];

    products: ProductMysuffix[];

    taxes: TaxMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private invoiceItemService: InvoiceItemMysuffixService,
        private invoiceService: InvoiceMysuffixService,
        private productService: ProductMysuffixService,
        private taxService: TaxMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.invoiceService.query()
            .subscribe((res: ResponseWrapper) => { this.invoices = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.productService
            .query({filter: 'invoiceitem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.invoiceItem.productId) {
                    this.products = res.json;
                } else {
                    this.productService
                        .find(this.invoiceItem.productId)
                        .subscribe((subRes: ProductMysuffix) => {
                            this.products = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.taxService
            .query({filter: 'invoiceitem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.invoiceItem.taxId) {
                    this.taxes = res.json;
                } else {
                    this.taxService
                        .find(this.invoiceItem.taxId)
                        .subscribe((subRes: TaxMysuffix) => {
                            this.taxes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoiceItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceItemService.update(this.invoiceItem), false);
        } else {
            this.subscribeToSaveResponse(
                this.invoiceItemService.create(this.invoiceItem), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceItemMysuffix>, isCreated: boolean) {
        result.subscribe((res: InvoiceItemMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: InvoiceItemMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.invoiceItem.created'
            : 'drzugApp.invoiceItem.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'invoiceItemListModification', content: 'OK'});
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

    trackInvoiceById(index: number, item: InvoiceMysuffix) {
        return item.id;
    }

    trackProductById(index: number, item: ProductMysuffix) {
        return item.id;
    }

    trackTaxById(index: number, item: TaxMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-item-mysuffix-popup',
    template: ''
})
export class InvoiceItemMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceItemPopupService: InvoiceItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.invoiceItemPopupService
                    .open(InvoiceItemMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.invoiceItemPopupService
                    .open(InvoiceItemMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
