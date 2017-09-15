import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

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
    isSaving: boolean;

    invoices: InvoiceMysuffix[];

    products: ProductMysuffix[];

    taxes: TaxMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private invoiceItemService: InvoiceItemMysuffixService,
        private invoiceService: InvoiceMysuffixService,
        private productService: ProductMysuffixService,
        private taxService: TaxMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
                this.invoiceItemService.update(this.invoiceItem));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceItemService.create(this.invoiceItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<InvoiceItemMysuffix>) {
        result.subscribe((res: InvoiceItemMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceItemMysuffix) {
        this.eventManager.broadcast({ name: 'invoiceItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceItemPopupService: InvoiceItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceItemPopupService
                    .open(InvoiceItemMysuffixDialogComponent as Component, params['id']);
            } else {
                this.invoiceItemPopupService
                    .open(InvoiceItemMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
