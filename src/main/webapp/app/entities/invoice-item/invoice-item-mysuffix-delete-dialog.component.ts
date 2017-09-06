import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { InvoiceItemMysuffix } from './invoice-item-mysuffix.model';
import { InvoiceItemMysuffixPopupService } from './invoice-item-mysuffix-popup.service';
import { InvoiceItemMysuffixService } from './invoice-item-mysuffix.service';

@Component({
    selector: 'jhi-invoice-item-mysuffix-delete-dialog',
    templateUrl: './invoice-item-mysuffix-delete-dialog.component.html'
})
export class InvoiceItemMysuffixDeleteDialogComponent {

    invoiceItem: InvoiceItemMysuffix;

    constructor(
        private invoiceItemService: InvoiceItemMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.invoiceItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceItemListModification',
                content: 'Deleted an invoiceItem'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.invoiceItem.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-invoice-item-mysuffix-delete-popup',
    template: ''
})
export class InvoiceItemMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceItemPopupService: InvoiceItemMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.invoiceItemPopupService
                .open(InvoiceItemMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
