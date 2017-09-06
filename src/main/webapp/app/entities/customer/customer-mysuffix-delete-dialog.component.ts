import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { CustomerMysuffix } from './customer-mysuffix.model';
import { CustomerMysuffixPopupService } from './customer-mysuffix-popup.service';
import { CustomerMysuffixService } from './customer-mysuffix.service';

@Component({
    selector: 'jhi-customer-mysuffix-delete-dialog',
    templateUrl: './customer-mysuffix-delete-dialog.component.html'
})
export class CustomerMysuffixDeleteDialogComponent {

    customer: CustomerMysuffix;

    constructor(
        private customerService: CustomerMysuffixService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:  number) {
        this.customerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('drzugApp.customer.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-customer-mysuffix-delete-popup',
    template: ''
})
export class CustomerMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.customerPopupService
                .open(CustomerMysuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
