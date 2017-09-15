import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { OrderItemMysuffix } from './order-item-mysuffix.model';
import { OrderItemMysuffixPopupService } from './order-item-mysuffix-popup.service';
import { OrderItemMysuffixService } from './order-item-mysuffix.service';
import { ProductMysuffix, ProductMysuffixService } from '../product';
import { OrderMysuffix, OrderMysuffixService } from '../order';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-order-item-mysuffix-dialog',
    templateUrl: './order-item-mysuffix-dialog.component.html'
})
export class OrderItemMysuffixDialogComponent implements OnInit {

    orderItem: OrderItemMysuffix;
    authorities: any[];
    isSaving: boolean;

    products: ProductMysuffix[];

    orders: OrderMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private orderItemService: OrderItemMysuffixService,
        private productService: ProductMysuffixService,
        private orderService: OrderMysuffixService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.productService
            .query({filter: 'orderitem-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.orderItem.productId) {
                    this.products = res.json;
                } else {
                    this.productService
                        .find(this.orderItem.productId)
                        .subscribe((subRes: ProductMysuffix) => {
                            this.products = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.orderService.query()
            .subscribe((res: ResponseWrapper) => { this.orders = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderItemService.update(this.orderItem), false);
        } else {
            this.subscribeToSaveResponse(
                this.orderItemService.create(this.orderItem), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderItemMysuffix>, isCreated: boolean) {
        result.subscribe((res: OrderItemMysuffix) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: OrderItemMysuffix, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'drzugApp.orderItem.created'
            : 'drzugApp.orderItem.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'orderItemListModification', content: 'OK'});
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

    trackProductById(index: number, item: ProductMysuffix) {
        return item.id;
    }

    trackOrderById(index: number, item: OrderMysuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-item-mysuffix-popup',
    template: ''
})
export class OrderItemMysuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.orderItemPopupService
                    .open(OrderItemMysuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.orderItemPopupService
                    .open(OrderItemMysuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
