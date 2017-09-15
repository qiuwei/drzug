import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { PaymentMysuffix } from './payment-mysuffix.model';
import { PaymentMysuffixService } from './payment-mysuffix.service';

@Component({
    selector: 'jhi-payment-mysuffix-detail',
    templateUrl: './payment-mysuffix-detail.component.html'
})
export class PaymentMysuffixDetailComponent implements OnInit, OnDestroy {

    payment: PaymentMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private paymentService: PaymentMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPayments();
    }

    load(id) {
        this.paymentService.find(id).subscribe((payment) => {
            this.payment = payment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPayments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paymentListModification',
            (response) => this.load(this.payment.id)
        );
    }
}
