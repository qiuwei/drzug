import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { PurchaseItemMysuffix } from './purchase-item-mysuffix.model';
import { PurchaseItemMysuffixService } from './purchase-item-mysuffix.service';

@Component({
    selector: 'jhi-purchase-item-mysuffix-detail',
    templateUrl: './purchase-item-mysuffix-detail.component.html'
})
export class PurchaseItemMysuffixDetailComponent implements OnInit, OnDestroy {

    purchaseItem: PurchaseItemMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private purchaseItemService: PurchaseItemMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPurchaseItems();
    }

    load(id) {
        this.purchaseItemService.find(id).subscribe((purchaseItem) => {
            this.purchaseItem = purchaseItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPurchaseItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'purchaseItemListModification',
            (response) => this.load(this.purchaseItem.id)
        );
    }
}
