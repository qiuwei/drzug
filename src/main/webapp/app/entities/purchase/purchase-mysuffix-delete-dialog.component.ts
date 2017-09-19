import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PurchaseMysuffix } from './purchase-mysuffix.model';
import { PurchaseMysuffixPopupService } from './purchase-mysuffix-popup.service';
import { PurchaseMysuffixService } from './purchase-mysuffix.service';

@Component({
    selector: 'jhi-purchase-mysuffix-delete-dialog',
    templateUrl: './purchase-mysuffix-delete-dialog.component.html'
})
export class PurchaseMysuffixDeleteDialogComponent {

    purchase: PurchaseMysuffix;

    constructor(
        private purchaseService: PurchaseMysuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.purchaseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'purchaseListModification',
                content: 'Deleted an purchase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-purchase-mysuffix-delete-popup',
    template: ''
})
export class PurchaseMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchasePopupService: PurchaseMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.purchasePopupService
                .open(PurchaseMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
