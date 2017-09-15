import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

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
    authorities: any[];
    isSaving: boolean;

    purchases: PurchaseMysuffix[];

    products: ProductMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private purchaseItemService: PurchaseItemMysuffixService,
        private purchaseService: PurchaseMysuffixService,
        private productService: ProductMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
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
                this.purchaseItemService.update(this.purchaseItem), false);
        } else {
            this.subscribeToSaveResponse(
                this.purchaseItemService.create(this.purchaseItem), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<PurchaseItemMysuffix>, isCreated: boolean) {
        result.subscribe((res: PurchaseItemMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PurchaseItemMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.purchaseItem.created'
            : 'drzugApp.purchaseItem.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'purchaseItemListModification', content: 'OK'});
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

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchaseItemPopupService: PurchaseItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.purchaseItemPopupService
                    .open(PurchaseItemMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.purchaseItemPopupService
                    .open(PurchaseItemMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
