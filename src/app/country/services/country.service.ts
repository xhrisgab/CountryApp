import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      // map( CountryMapper.mapRestCountryArrayToCountryArray )
      map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      catchError( error => {
        console.log('Error fetching', error);
        return throwError(()=> new Error(`No se pudo obtener paises del query ${query}`));
        
      })
    );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();
    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      // map( CountryMapper.mapRestCountryArrayToCountryArray )
      map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      delay(2000),
      catchError( error => {
        console.log('Error fetching', error);
        return throwError(()=> new Error(`No se pudo obtener paises del query ${query}`));
        
      })
    );
  }

  searchCountryByAlphaCode( code: string ) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      map((countries) => countries.at(0)),
      catchError( error => {
        console.log('Error fetching', error);
        return throwError(()=> new Error(`No se pudo obtener paises con el codigo: ${code}`));
        
      })
    );
  }

}
