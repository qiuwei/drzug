import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { TaxMysuffix } from './tax-mysuffix.model';
import { TaxMysuffixService } from './tax-mysuffix.service';

@Component({
    selector: 'jhi-tax-mysuffix-detail',
    templateUrl: './tax-mysuffix-detail.component.html'
})
export class TaxMysuffixDetailComponent implements OnInit, OnDestroy {

    tax: TaxMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private taxService: TaxMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTaxes();
    }

    load(id) {
        this.taxService.find(id).subscribe((tax) => {
            this.tax = tax;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTaxes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taxListModification',
            (response) => this.load(this.tax.id)
        );
    }
}
