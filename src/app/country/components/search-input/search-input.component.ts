import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent { 

  placeholder = input('Buscar');
  debounceTime = input(400);
  initialValue = input<string>();

  value = output<string>();
  inputValue = linkedSignal<string>(()=>this.initialValue()??'');

  debounceEffect = effect((onCleanup)=> {
    const valueF = this.inputValue(); // dispara efecto en cambio del value

    const timeout = setTimeout(()=>{this.value.emit(valueF)},this.debounceTime());

    onCleanup(()=> {
      clearTimeout(timeout);
    });
  })
}
