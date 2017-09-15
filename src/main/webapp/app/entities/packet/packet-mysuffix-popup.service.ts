import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PacketMysuffix } from './packet-mysuffix.model';
import { PacketMysuffixService } from './packet-mysuffix.service';
@Injectable()
export class PacketMysuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private packetService: PacketMysuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.packetService.find(id).subscribe((packet) => {
                this.packetModalRef(component, packet);
            });
        } else {
            return this.packetModalRef(component, new PacketMysuffix());
        }
    }

    packetModalRef(component: Component, packet: PacketMysuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.packet = packet;
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
