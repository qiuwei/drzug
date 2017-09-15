/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProviderMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/provider/provider-mysuffix-detail.component';
import { ProviderMysuffixService } from '../../../../../../main/webapp/app/entities/provider/provider-mysuffix.service';
import { ProviderMysuffix } from '../../../../../../main/webapp/app/entities/provider/provider-mysuffix.model';

describe('Component Tests', () => {

    describe('ProviderMysuffix Management Detail Component', () => {
        let comp: ProviderMysuffixDetailComponent;
        let fixture: ComponentFixture<ProviderMysuffixDetailComponent>;
        let service: ProviderMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [ProviderMysuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProviderMysuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProviderMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderMysuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProviderMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.provider).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
