import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

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
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-mysuffix-delete-popup',
    template: ''
})
export class CustomerMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerPopupService
                .open(CustomerMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
