import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { OrderItemMysuffix } from './order-item-mysuffix.model';
import { OrderItemMysuffixService } from './order-item-mysuffix.service';

@Component({
    selector: 'jhi-order-item-mysuffix-detail',
    templateUrl: './order-item-mysuffix-detail.component.html'
})
export class OrderItemMysuffixDetailComponent implements OnInit, OnDestroy {

    orderItem: OrderItemMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private orderItemService: OrderItemMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrderItems();
    }

    load(id) {
        this.orderItemService.find(id).subscribe((orderItem) => {
            this.orderItem = orderItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrderItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderItemListModification',
            (response) => this.load(this.orderItem.id)
        );
    }
}
