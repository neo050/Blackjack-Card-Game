import { stdout } from "process";
import Card from "./Card";
import Deck from "./Deck";


class Game
{
    private deck:Deck;
    private playerFunds:number;
    private playerBet:number;
    private playerCards:Card[]=[];
    private playerCardsValue:number=0;
    private dealerCards:Card[]=[];
    private dealerCardsValue:number=0;
    private prompt;
    constructor (prompt: (msg: string) => string)
    {
        this.deck=new Deck()
        this.playerFunds=100;
        this.playerBet=1;
        this.prompt=prompt;
        this.ResetGame();

     
    }
    private ResetGame()
    {
        this.deck=new Deck();
        this.playerCards=[];
        this.dealerCards=[];
        this.playerCardsValue=0;
        this.dealerCardsValue=0;
        this.addPcard();
        this.addDcard();
        this.addPcard();
        this.addDcard();
        if(this.getPlayerFunds()===0)
        {
            this.setPlayerFunds(100);

        }
        this.Blackjack();

    }

    private Blackjack()
    {
        console.log(`Welcome to Blackjack CLI! A♠️  K♠️`);
        console.log(`Player's funds:$ ${this.playerFunds}`);
          process.on('SIGINT', () => {
            console.log('\nExiting gracefully...');
              process.exit(0);
              });
        this.checkCardValue("player");
        this.checkCardValue("dealer");
        this.checkValideBet();
        this.watch(false);
        let bool = true;
      

        while(bool)
        {
          
            let bet:string='';
            while (bet!=="hit" && bet!=="stand")
            {
               
              bet = this.input('Your action (hit/stand): ');
            
            }
            if(bet==="hit")
            {
                this.addPcard();
                this.checkCardValue("player");
                this.watch(false);
                if(this.getPlayerCardsValue()>=21)
                {
                    this.DeterminingTheWinner();
                    bool=false;
   
                }

            }
            else
            {
                this.watch(true);
                while(this.getDealerCardsValue()<17)
                {
                    this.addDcard();
                    this.checkCardValue("dealer");
                    this.watch(true);

                }
                this.DeterminingTheWinner();
                bool=false;
                

            }

        }
      


    }

   private DeterminingTheWinner()
   {
       
        if(this.playerCards.length===2&&this.getPlayerCardsValue()===21&&this.getDealerCardsValue()!==21)
        {
            this.setPlayerFunds(this.getPlayerBet()* 3/2);
            console.log(`You win $${this.getPlayerBet()* 3/2}! (3:2 payout for Blackjack)`);
            console.log(`Player's funds: $${this.getPlayerFunds()}`);
            this.ResetGame();

        }
        else if(this.getPlayerCardsValue()>this.getDealerCardsValue()&&this.getPlayerCardsValue()<=21)
        {
            this.setPlayerFunds(this.getPlayerBet()* 2);
            console.log(`You win $${this.getPlayerBet()* 2}!`);
            console.log(`Player's funds: $${this.getPlayerFunds()}`);
            this.ResetGame();

        }
        else if(this.getPlayerCardsValue()===this.getDealerCardsValue()&&this.getDealerCardsValue()>=17)
        {
            this.setPlayerFunds(this.getPlayerBet());
            console.log(`It's a push! Your bet is returned.`);
            console.log(`Player's funds: $${this.getPlayerFunds()}`);


            this.ResetGame();
        }
        else if(this.getPlayerCardsValue()>21&&this.getDealerCardsValue()<=21)
        {
            console.log(`You bust and lose $${this.getPlayerBet()}!`);
            console.log(`Player's funds: $${this.getPlayerFunds()}`);
            this.ResetGame();
        }
         else if( this.getPlayerCardsValue()<this.getDealerCardsValue()&&this.getDealerCardsValue()<=21)
        {
            console.log(`You bust and lose $${this.getPlayerBet()}!`);
            console.log(`Player's funds: $${this.getPlayerFunds()}`);
            this.ResetGame();
        }

         else if(this.getPlayerCardsValue()<=21&&this.getDealerCardsValue()>21)
        {
            this.setPlayerFunds(this.getPlayerBet()* 2);
            console.log(`You win $${this.getPlayerBet()* 2}!`);
            console.log(`Player's funds: $${this.getPlayerFunds()}`);
            this.ResetGame();
        }

   }

    private watch(all:boolean)
    {
        console.log(`Your hand: `,this.getPlayerCards(),`(total: ${this.getPlayerCardsValue()})`);
        if(all)
        {
            console.log(`Dealer's hand:`, this.getDealerCards(all) ,`(total: ${this.getDealerCardsValue()})`);
        }
        else
        {
            console.log(`Dealer's hand: `, this.getDealerCards(all));

        }
    }
    private setPlayerBet(number:number)
    {
        this.playerBet=number;

    }
    private setPlayerFunds(number:number)

    {
        this.playerFunds+=number;
    }

    

    private input(str:string):string 
    {   
        
        process.on('SIGINT', () => {
            console.log('\nExiting gracefully...');
            process.exit(0);
        });
        let res = this.prompt(str);
        if( typeof res==="string" )
             return  res;
        return "null";
    }

    
    private checkValideBet()
    {
        let bet:string = this.input('Enter your bet:$');
        
        while (Number.isNaN(parseInt(bet,10)) ||parseInt(bet,10)<=0 || parseInt(bet,10)>this.playerFunds )
        {
            bet = this.input('Invalide bet\nEnter your bet:$');

        }
        this.setPlayerBet(parseInt(bet,10));
        this.setPlayerFunds(-parseInt(bet,10))

    }
    private checkCardValue(rool:'player'|'dealer')
    {   
        switch(rool)
        {
            case 'player':
                this.playerCardsValue=0;
                this.playerCards.forEach((card=>
                {
                    
                    const val = card.getValue();
                    if(val !=='A'){
                        if(val=== "J" ||val=== "Q" ||val=== "K" )
                        {
                        this.setPlayerCardsValue(10);
                        }
                        else if(val=== "2" ||val=== "3" ||val=== "4"||val=== "5" ||val=== "6" ||val=== "7" ||val=== "8" ||val=== "9" ||val=== "10")
                        {
                        this.setPlayerCardsValue(parseInt(val,10));
                        }
                    }
                 
                    
                }));
                this.playerCards.forEach((card=>
                {
                    
                    const val = card.getValue();
                    if(val ==='A')
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
                this.dealerCardsValue=0;
                  this.dealerCards.forEach((card=>
                 {
                    const val = card.getValue();
                    if(val !=='A')
                    {
                        if(val=== "J" ||val=== "Q" ||val=== "K" )
                        {
                        this.setDealerCardsValue(10);
                        }
                        else if(val=== "2" ||val=== "3" ||val=== "4"||val=== "5" ||val=== "6" ||val=== "7" ||val=== "8" ||val=== "9" ||val=== "10")
                        {
                        this.setDealerCardsValue(parseInt(val,10));
                        }
                    }
                    
                 }));
                
                this.dealerCards.forEach((card=>
                {
                    const val = card.getValue();
                    if(val ==='A')
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
    private getPlayerCards()
    {
        return this.playerCards.map(card=>card.toString());
    }
    private getDealerCards(all:boolean)
    {
        if(all)
            return this.dealerCards.map(card=>card.toString());
         
        return this.dealerCards[0].toString()+`,[hidden]`;

    }
    private addPcard()
    {
        this.playerCards.push(this.deck.getCard());

    }
    private addDcard()
    {
        this.dealerCards.push(this.deck.getCard());

    }
    private getPlayerBet()
    {
        return this.playerBet;
    }
     private getPlayerFunds()
    {
        return this.playerFunds;
    }
}
export default Game;