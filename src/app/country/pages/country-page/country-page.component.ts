import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: ()=> ({code: this.countryCode}),
    stream: ({params}) => this.countryService.searchCountryByAlphaCode(params.code),
  })
}
