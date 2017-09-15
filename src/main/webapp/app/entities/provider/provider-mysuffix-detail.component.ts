import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderMysuffix } from './provider-mysuffix.model';
import { ProviderMysuffixService } from './provider-mysuffix.service';

@Component({
    selector: 'jhi-provider-mysuffix-detail',
    templateUrl: './provider-mysuffix-detail.component.html'
})
export class ProviderMysuffixDetailComponent implements OnInit, OnDestroy {

    provider: ProviderMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private providerService: ProviderMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProviders();
    }

    load(id) {
        this.providerService.find(id).subscribe((provider) => {
            this.provider = provider;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProviders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'providerListModification',
            (response) => this.load(this.provider.id)
        );
    }
}
