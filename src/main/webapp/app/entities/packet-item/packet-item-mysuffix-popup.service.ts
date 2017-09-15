import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PacketItemMysuffix } from './packet-item-mysuffix.model';
import { PacketItemMysuffixService } from './packet-item-mysuffix.service';
@Injectable()
export class PacketItemMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private packetItemService: PacketItemMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.packetItemService.find(id).subscribe((packetItem) => {
                this.packetItemModalRef(component, packetItem);
            });
        } else {
            return this.packetItemModalRef(component, new PacketItemMysuffix());
        }
    }

    packetItemModalRef(component: Component, packetItem: PacketItemMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.packetItem = packetItem;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
