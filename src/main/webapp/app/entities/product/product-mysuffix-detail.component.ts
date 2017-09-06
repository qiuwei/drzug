import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { ProductMysuffix } from './product-mysuffix.model';
import { ProductMysuffixService } from './product-mysuffix.service';

@Component({
    selector: 'jhi-product-mysuffix-detail',
    templateUrl: './product-mysuffix-detail.component.html'
})
export class ProductMysuffixDetailComponent implements OnInit, OnDestroy {

    product: ProductMysuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private productService: ProductMysuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProducts();
    }

    load(id) {
        this.productService.find(id).subscribe((product) => {
            this.product = product;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productListModification',
            (response) => this.load(this.product.id)
        );
    }
}
