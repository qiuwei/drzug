import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PurchaseItemMysuffix } from './purchase-item-mysuffix.model';
import { PurchaseItemMysuffixPopupService } from './purchase-item-mysuffix-popup.service';
import { PurchaseItemMysuffixService } from './purchase-item-mysuffix.service';
import { PurchaseMysuffix, PurchaseMysuffixService } from '../purchase';
import { ProductMysuffix, ProductMysuffixService } from '../product';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-purchase-item-mysuffix-dialog',
    templateUrl: './purchase-item-mysuffix-dialog.component.html'
})
export class PurchaseItemMysuffixDialogComponent implements OnInit {

    purchaseItem: PurchaseItemMysuffix;
    isSaving: boolean;

    purchases: PurchaseMysuffix[];

    products: ProductMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private purchaseItemService: PurchaseItemMysuffixService,
        private purchaseService: PurchaseMysuffixService,
        private productService: ProductMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.purchaseService.query()
            .subscribe((res: ResponseWrapper) => { this.purchases = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.productService
            .query({filter: 'purchaseitem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.purchaseItem.productId) {
                    this.products = res.json;
                } else {
                    this.productService
                        .find(this.purchaseItem.productId)
                        .subscribe((subRes: ProductMysuffix) => {
                            this.products = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.purchaseItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.purchaseItemService.update(this.purchaseItem));
        } else {
            this.subscribeToSaveResponse(
                this.purchaseItemService.create(this.purchaseItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<PurchaseItemMysuffix>) {
        result.subscribe((res: PurchaseItemMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PurchaseItemMysuffix) {
        this.eventManager.broadcast({ name: 'purchaseItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPurchaseById(index: number, item: PurchaseMysuffix) {
        return item.id;
    }

    trackProductById(index: number, item: ProductMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-purchase-item-mysuffix-popup',
    template: ''
})
export class PurchaseItemMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchaseItemPopupService: PurchaseItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.purchaseItemPopupService
                    .open(PurchaseItemMysuffixDialogComponent as Component, params['id']);
            } else {
                this.purchaseItemPopupService
                    .open(PurchaseItemMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
