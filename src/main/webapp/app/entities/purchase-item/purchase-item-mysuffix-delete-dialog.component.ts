import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { PurchaseItemMysuffix } from './purchase-item-mysuffix.model';
import { PurchaseItemMysuffixPopupService } from './purchase-item-mysuffix-popup.service';
import { PurchaseItemMysuffixService } from './purchase-item-mysuffix.service';

@Component({
    selector: 'jhi-purchase-item-mysuffix-delete-dialog',
    templateUrl: './purchase-item-mysuffix-delete-dialog.component.html'
})
export class PurchaseItemMysuffixDeleteDialogComponent {

    purchaseItem: PurchaseItemMysuffix;

    constructor(
        private purchaseItemService: PurchaseItemMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.purchaseItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'purchaseItemListModification',
                content: 'Deleted an purchaseItem'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.purchaseItem.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-purchase-item-mysuffix-delete-popup',
    template: ''
})
export class PurchaseItemMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private purchaseItemPopupService: PurchaseItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.purchaseItemPopupService
                .open(PurchaseItemMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
