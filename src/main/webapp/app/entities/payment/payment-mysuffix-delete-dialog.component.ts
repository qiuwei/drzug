import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentMysuffix } from './payment-mysuffix.model';
import { PaymentMysuffixPopupService } from './payment-mysuffix-popup.service';
import { PaymentMysuffixService } from './payment-mysuffix.service';

@Component({
    selector: 'jhi-payment-mysuffix-delete-dialog',
    templateUrl: './payment-mysuffix-delete-dialog.component.html'
})
export class PaymentMysuffixDeleteDialogComponent {

    payment: PaymentMysuffix;

    constructor(
        private paymentService: PaymentMysuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentListModification',
                content: 'Deleted an payment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-mysuffix-delete-popup',
    template: ''
})
export class PaymentMysuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentPopupService: PaymentMysuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentPopupService
                .open(PaymentMysuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
