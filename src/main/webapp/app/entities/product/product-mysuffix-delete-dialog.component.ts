import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductMysuffix } from './product-mysuffix.model';
import { ProductMysuffixPopupService } from './product-mysuffix-popup.service';
import { ProductMysuffixService } from './product-mysuffix.service';

@Component({
    selector: 'jhi-product-mysuffix-delete-dialog',
    templateUrl: './product-mysuffix-delete-dialog.component.html'
})
export class ProductMysuffixDeleteDialogComponent {

    product: ProductMysuffix;

    constructor(
        private productService: ProductMysuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-mysuffix-delete-popup',
    template: ''
})
export class ProductMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
