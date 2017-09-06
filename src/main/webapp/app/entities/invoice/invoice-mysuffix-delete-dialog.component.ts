import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { InvoiceMysuffix } from './invoice-mysuffix.model';
import { InvoiceMysuffixPopupService } from './invoice-mysuffix-popup.service';
import { InvoiceMysuffixService } from './invoice-mysuffix.service';

@Component({
    selector: 'jhi-invoice-mysuffix-delete-dialog',
    templateUrl: './invoice-mysuffix-delete-dialog.component.html'
})
export class InvoiceMysuffixDeleteDialogComponent {

    invoice: InvoiceMysuffix;

    constructor(
        private invoiceService: InvoiceMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.invoiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceListModification',
                content: 'Deleted an invoice'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.invoice.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-invoice-mysuffix-delete-popup',
    template: ''
})
export class InvoiceMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoiceMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.invoicePopupService
                .open(InvoiceMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
