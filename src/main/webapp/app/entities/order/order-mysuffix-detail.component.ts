import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { OrderMysuffix } from './order-mysuffix.model';
import { OrderMysuffixService } from './order-mysuffix.service';

@Component({
    selector: 'jhi-order-mysuffix-detail',
    templateUrl: './order-mysuffix-detail.component.html'
})
export class OrderMysuffixDetailComponent implements OnInit, OnDestroy {

    order: OrderMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private orderService: OrderMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrders();
    }

    load(id) {
        this.orderService.find(id).subscribe((order) => {
            this.order = order;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'orderListModification',
            (response) => this.load(this.order.id)
        );
    }
}
