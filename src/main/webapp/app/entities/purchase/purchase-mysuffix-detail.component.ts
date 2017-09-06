import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { PurchaseMysuffix } from './purchase-mysuffix.model';
import { PurchaseMysuffixService } from './purchase-mysuffix.service';

@Component({
    selector: 'jhi-purchase-mysuffix-detail',
    templateUrl: './purchase-mysuffix-detail.component.html'
})
export class PurchaseMysuffixDetailComponent implements OnInit, OnDestroy {

    purchase: PurchaseMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private purchaseService: PurchaseMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPurchases();
    }

    load(id) {
        this.purchaseService.find(id).subscribe((purchase) => {
            this.purchase = purchase;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPurchases() {
        this.eventSubscriber = this.eventManager.subscribe(
            'purchaseListModification',
            (response) => this.load(this.purchase.id)
        );
    }
}
