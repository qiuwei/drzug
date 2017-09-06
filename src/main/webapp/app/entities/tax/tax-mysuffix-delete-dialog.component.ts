import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { TaxMysuffix } from './tax-mysuffix.model';
import { TaxMysuffixPopupService } from './tax-mysuffix-popup.service';
import { TaxMysuffixService } from './tax-mysuffix.service';

@Component({
    selector: 'jhi-tax-mysuffix-delete-dialog',
    templateUrl: './tax-mysuffix-delete-dialog.component.html'
})
export class TaxMysuffixDeleteDialogComponent {

    tax: TaxMysuffix;

    constructor(
        private taxService: TaxMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.taxService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taxListModification',
                content: 'Deleted an tax'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.tax.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-tax-mysuffix-delete-popup',
    template: ''
})
export class TaxMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxPopupService: TaxMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.taxPopupService
                .open(TaxMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
