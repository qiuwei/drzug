import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { InvoiceMysuffix } from './invoice-mysuffix.model';
import { InvoiceMysuffixService } from './invoice-mysuffix.service';

@Component({
    selector: 'jhi-invoice-mysuffix-detail',
    templateUrl: './invoice-mysuffix-detail.component.html'
})
export class InvoiceMysuffixDetailComponent implements OnInit, OnDestroy {

    invoice: InvoiceMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private invoiceService: InvoiceMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoices();
    }

    load(id) {
        this.invoiceService.find(id).subscribe((invoice) => {
            this.invoice = invoice;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceListModification',
            (response) => this.load(this.invoice.id)
        );
    }
}
