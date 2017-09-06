import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { InvoiceItemMysuffix } from './invoice-item-mysuffix.model';
import { InvoiceItemMysuffixService } from './invoice-item-mysuffix.service';

@Component({
    selector: 'jhi-invoice-item-mysuffix-detail',
    templateUrl: './invoice-item-mysuffix-detail.component.html'
})
export class InvoiceItemMysuffixDetailComponent implements OnInit, OnDestroy {

    invoiceItem: InvoiceItemMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private invoiceItemService: InvoiceItemMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceItems();
    }

    load(id) {
        this.invoiceItemService.find(id).subscribe((invoiceItem) => {
            this.invoiceItem = invoiceItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceItemListModification',
            (response) => this.load(this.invoiceItem.id)
        );
    }
}
