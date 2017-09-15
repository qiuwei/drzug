import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

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
        private eventManager: JhiEventManager
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
    }
}

@Component({
    selector: 'jhi-tax-mysuffix-delete-popup',
    template: ''
})
export class TaxMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxPopupService: TaxMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.taxPopupService
                .open(TaxMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
