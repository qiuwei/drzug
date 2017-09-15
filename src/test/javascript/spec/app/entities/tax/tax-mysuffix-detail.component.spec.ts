import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TaxMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tax/tax-mysuffix-detail.component';
import { TaxMysuffixService } from '../../../../../../main/webapp/app/entities/tax/tax-mysuffix.service';
import { TaxMysuffix } from '../../../../../../main/webapp/app/entities/tax/tax-mysuffix.model';

describe('Component Tests', () => {

    describe('TaxMysuffix Management Detail Component', () => {
        let comp: TaxMysuffixDetailComponent;
        let fixture: ComponentFixture<TaxMysuffixDetailComponent>;
        let service: TaxMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [TaxMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TaxMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(TaxMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TaxMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tax).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
