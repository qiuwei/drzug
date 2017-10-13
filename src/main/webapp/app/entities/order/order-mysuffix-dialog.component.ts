import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import {OrderMysuffix, OrderStatus} from './order-mysuffix.model';
import { OrderMysuffixPopupService } from './order-mysuffix-popup.service';
import { OrderMysuffixService } from './order-mysuffix.service';
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {OrderItemMysuffix} from "../order-item/order-item-mysuffix.model";

@Component({
    selector: 'jhi-order-mysuffix-dialog',
    templateUrl: './order-mysuffix-dialog.component.html'
})
export class OrderMysuffixDialogComponent implements OnInit {

    order: OrderMysuffix;
    isSaving: boolean;
    orderForm: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private alertService: JhiAlertService,
        private orderService: OrderMysuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.createForm();
        //this.setOrderItems(this.order.orderItems);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    createForm() {
        this.orderForm  = this.fb.group({
            id: '',
            createdAt: '',
            status: 'New',
            orderItems: this.fb.array([])
        });
    }

    get orderItems(): FormArray {
        return this.orderForm.get('orderItems') as FormArray;

    }

    setOrderItems(orderItems: OrderItemMysuffix[]) {
        const orderItemFGs = orderItems.map(orderItem => this.fb.group(orderItem));
        const orderItemArray = this.fb.array(orderItemFGs);
        this.orderForm.setControl('orderItems', orderItemArray);
    }


    addOrderItem() {
        this.orderItems.push(this.fb.group(new OrderItemMysuffix()));
    }

    removeOrderItem(i: number) {
        this.orderItems.removeAt(i);
    }

    save() {
        this.isSaving = true;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderService.update(this.order));
        } else {
            this.subscribeToSaveResponse(
                this.orderService.create(this.order));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrderMysuffix>) {
        result.subscribe((res: OrderMysuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderMysuffix) {
        this.eventManager.broadcast({ name: 'orderListModification', content: 'OK'});
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
    selector: 'jhi-order-mysuffix-popup',
    template: ''
})
export class OrderMysuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderPopupService: OrderMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderPopupService
                    .open(OrderMysuffixDialogComponent as Component, params['id']);
            } else {
                this.orderPopupService
                    .open(OrderMysuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
