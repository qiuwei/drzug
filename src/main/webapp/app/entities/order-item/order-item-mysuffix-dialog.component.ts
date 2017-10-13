import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

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
    isSaving: boolean;

    products: ProductMysuffix[];

    orders: OrderMysuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private orderItemService: OrderItemMysuffixService,
        private productService: ProductMysuffixService,
        private orderService: OrderMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
                this.orderItemService.update(1, this.orderItem));
        } else {
            this.subscribeToSaveResponse(
                this.orderItemService.create(1, this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderItemMysuffix>) {
        result.subscribe((res: OrderItemMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderItemMysuffix) {
        this.eventManager.broadcast({ name: 'orderItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderItemPopupService
                    .open(OrderItemMysuffixDialogComponent as Component, params['id']);
            } else {
                this.orderItemPopupService
                    .open(OrderItemMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
