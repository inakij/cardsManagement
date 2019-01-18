import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Estados } from '../../../models/estados.enum';
import { CardStatus, ICardStatus } from '../../../models/card-status';
import { IApiCard, ApiCard } from '../../../models/api-card';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css']
})

export class CardStatusComponent implements OnInit {
  @Input() cards: IApiCard[] = [];
  @Input() reset: number;
  @Output() cardStatusOutput = new EventEmitter<ICardStatus>();

  public estados = Estados;
  public cardStatus: ICardStatus;
  public idiomas: string[];
  constructor() {

  }

  ngOnInit() {
    this.cardStatus = new CardStatus();
    this.idiomas = ["English"];
    this.cardStatus.idioma = "English";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cards) {
      const cards: SimpleChange = changes.cards;
      if (cards.currentValue.length === 1 && cards.currentValue[0].foreignNames) {
        this.idiomas = ["English"];
        this.cardStatus.idioma = "English";
        this.idiomas.push(...cards.currentValue[0].foreignNames.map(foreignName => foreignName.language));
      } else {
        this.idiomas = ["English"];
        if (this.cardStatus) {
          this.cardStatus.idioma = "English";
        }
      }
    }
    if (changes.reset) {
      const reset: SimpleChange = changes.reset;
      if (reset.currentValue > reset.previousValue) {
        this.cardStatus = new CardStatus();
        this.idiomas = ["English"];
        this.cardStatus.idioma = "English";
        this.emitStatus();
      }
    }
  }

  emitStatus() {
    if (this.cardStatus.idioma != '') {
      this.cardStatusOutput.emit(this.cardStatus);
    }
  }
}