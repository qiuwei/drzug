import { Component } from '@angular/core';
import {JhiLanguageHelper} from '../../shared/language/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {Principal} from '../../shared/auth/principal.service';
import {ProfileService} from '../profiles/profile.service';
import {Router} from '@angular/router';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    showMenu = '';


    constructor(
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.isActive = false;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
