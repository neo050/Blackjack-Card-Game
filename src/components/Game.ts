import Card from "./card";
import Deck from "./deck";
import promptSync from 'prompt-sync';
const prompt = promptSync();

class Game
{
    private deck:Deck;
    private playerFunds:number;
    private playerBet:number;
    private playerCards:Card[]=[];
    private playerCardsValue:number=0;
    private dealerCards:Card[]=[];
    private dealerCardsValue:number=0;
    constructor ()
    {
        this.deck=new Deck();
        this.playerFunds=100;
        this.playerBet=1;
        this.playerCards.push(this.deck.getCard());
        this.dealerCards.push(this.deck.getCard());
        this.playerCards.push(this.deck.getCard());
        this.dealerCards.push(this.deck.getCard());
    }

    public Blackjack()
    {
        console.log(`Welcome to Blackjack CLI! A♠️  K♠️`);
        console.log(`Player's funds:$ ${this.playerFunds}`);
        
        this.checkValideBet();

    }
    private setPlayerBet(number:number)
    {
        this.playerBet=this.playerBet+number;

    }
    private checkValideBet()
    {
        let bet:string = prompt('Enter your bet:$');
        
        while (Number.isNaN(parseInt(bet,10)) ||parseInt(bet,10)<=0 || parseInt(bet,10)>this.playerFunds )
        {
            bet = prompt('Invalide bet\nEnter your bet:$');

        }
        this.setPlayerBet(-parseInt(bet,10));

    }
    private checkCardValue(rool:'player'|'dealer')
    {   
        switch(rool)
        {
            case 'player':
                this.playerCards.forEach((card=>
                {
                    const val = card.getValue();
                    if(val=== "J" ||val=== "Q" ||val=== "K" )
                    {
                    this.setPlayerCardsValue(10);
                    }
                    else if(val=== "2" ||val=== "3" ||val=== "4"||val=== "5" ||val=== "6" ||val=== "7" ||val=== "8" ||val=== "9" ||val=== "10")
                    {
                    this.setPlayerCardsValue(parseInt(val,10));
                    }
                    else
                    {
                        if(this.getPlayerCardsValue()+11>21)
                        {
                            this.setPlayerCardsValue(1);
                        }
                        else
                        {
                            this.setPlayerCardsValue(11);
                        }
                    }
                    
                }));
                break;
            
            case 'dealer':
                  this.dealerCards.forEach((card=>
                {
                    const val = card.getValue();
                    if(val=== "J" ||val=== "Q" ||val=== "K" )
                    {
                    this.setDealerCardsValue(10);
                    }
                    else if(val=== "2" ||val=== "3" ||val=== "4"||val=== "5" ||val=== "6" ||val=== "7" ||val=== "8" ||val=== "9" ||val=== "10")
                    {
                    this.setDealerCardsValue(parseInt(val,10));
                    }
                    else
                    {
                        if(this.getDealerCardsValue()+11>21)
                        {
                            this.setDealerCardsValue(1);
                        }
                        else
                        {
                            this.setDealerCardsValue(11);
                        }
                    }
                    
                }));
                break;
        }
        
        
    }

    private setPlayerCardsValue(number:number)
    {
        this.playerCardsValue+=number;
    }
     private setDealerCardsValue(number:number)
    {
        this.dealerCardsValue+=number;
    }

    private getPlayerCardsValue():number
    {
        return this.playerCardsValue;
    }
     private getDealerCardsValue():number
    {
        return this.dealerCardsValue;
    }

}