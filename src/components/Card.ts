import {cardType as CardSuit,cardValue} from "./types";
class Card {
 private  value: cardValue;
 private  suit: CardSuit;
 constructor (value: cardValue,suit: CardSuit)
 {
    this.value=value;
    this.suit=suit;
 }
 getCard()
 {
        return `${this.value}${this.suit}`;
 }
 getValue():cardValue
 {
    return this.value;
 }
 toString()
 {
    return `${this.value}${this.suit}`;
 }
}

export default Card;