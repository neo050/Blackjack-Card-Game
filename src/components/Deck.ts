import Card from "./Card"
import {cardType as CardSuit,cardValue} from "./types";
class Deck
{
    private Pack : Card[]=[];
    constructor () 
    {
        this.createPack();
    }
    private createPack()
    {
        const val:cardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const type:CardSuit[]=["♠","♥","♦","♣"];
       
        for(let i:number=0;i<13;i++)
        {
            this.Pack.push(new Card(val[i],type[0]));
            this.Pack.push(new Card(val[i],type[1]));
            this.Pack.push(new Card(val[i],type[2]));
            this.Pack.push(new Card(val[i],type[3]));
            
        }
        this.Pack=this.shuffleArray(this.Pack);
    }

    private  shuffleArray(array: Card[]) {
        for (let i = array.length - 1; i > 0; i--) 
            {
            // Generate a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at indices i and j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
        }

   public getCard() :Card
    {
        const card = this.Pack.pop();
        if(card===undefined)
        {
            this.createPack();
            const card1 = this.Pack.pop();

            if (card1 instanceof Card)
            {
                return card1;
            }
             return new Card("A","♠");
                
        }
        
         return card;
              

    }

}
export default Deck;