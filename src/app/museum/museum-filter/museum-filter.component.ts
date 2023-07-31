import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { ValueFilter, FormArtists } from 'src/app/models/interface';
import { Nullish } from 'src/app/models/nullish';

@Component({
  selector: 'app-museum-filter',
  templateUrl: './museum-filter.component.html',
  styleUrls: ['./museum-filter.component.scss'],
})
export class MuseumFilterComponent implements OnInit, OnChanges {
  @Input() filters: Nullish<ValueFilter>;
  @Output() searchValues: EventEmitter<Partial<ValueFilter>> =
    new EventEmitter();

  form = this.fb.group<FormArtists>({
    artistsName: new FormControl(),
    paintingsStatus: new FormControl(),
    paintingsName: new FormControl(),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (!this.filters) {
    //   return;
    // }
    // const { filters: filtersChanges } = changes;
    // if (this.filters && filtersChanges) {
    //   return this.form.patchValue(this.filters);
    // }
  }

  ngOnInit(): void {}

  search(): void {
    this.searchValues.emit(this.form.value);
  }

  reset(): void {
    this.form.reset();
    this.search();
  }
}
