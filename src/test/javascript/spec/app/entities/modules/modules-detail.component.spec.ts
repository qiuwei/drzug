/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModulesDetailComponent } from '../../../../../../main/webapp/app/entities/modules/modules-detail.component';
import { ModulesService } from '../../../../../../main/webapp/app/entities/modules/modules.service';
import { Modules } from '../../../../../../main/webapp/app/entities/modules/modules.model';

describe('Component Tests', () => {

    describe('Modules Management Detail Component', () => {
        let comp: ModulesDetailComponent;
        let fixture: ComponentFixture<ModulesDetailComponent>;
        let service: ModulesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [ModulesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModulesService,
                    JhiEventManager
                ]
            }).overrideTemplate(ModulesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModulesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModulesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modules(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modules).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
