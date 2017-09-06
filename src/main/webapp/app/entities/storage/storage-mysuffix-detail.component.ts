import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { StorageMysuffix } from './storage-mysuffix.model';
import { StorageMysuffixService } from './storage-mysuffix.service';

@Component({
    selector: 'jhi-storage-mysuffix-detail',
    templateUrl: './storage-mysuffix-detail.component.html'
})
export class StorageMysuffixDetailComponent implements OnInit, OnDestroy {

    storage: StorageMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private storageService: StorageMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStorages();
    }

    load(id) {
        this.storageService.find(id).subscribe((storage) => {
            this.storage = storage;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStorages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storageListModification',
            (response) => this.load(this.storage.id)
        );
    }
}
