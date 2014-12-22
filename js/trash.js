/******************************************************
* trash is a JavaScript/CSS/HTML way to play the  game
* 	against the computer. The game is build by creating
*	a game object made up of Card and Card Deck objects.
*
* Written by Kelby Dickey
* Date: 12/21/2014
* Version: 1.0
*
******************************************************/

/******************************************************
* Card object which will be used through out App and 
*	related objects like CrdDeck
******************************************************/
function Card(inRank,inSuit) {
	this.rank=''; 
	this.suit=''; 
	this.imgLoc='';
	this.bVisible=false;
	this.bSelectable=false;
	
    this.cardImgLoc=function(){
    	if (this.rank=="A"){            
      		imgLoc=(0*-69) + "px ";
   		}else if (this.rank==="2"){
      		imgLoc=(1*-69) + "px ";
   		}else if (this.rank==="3"){
      		imgLoc=(2*-69) + "px ";
   		}else if (this.rank==="4"){
      		imgLoc=(3*-69) + "px ";
   		}else if (this.rank==="5"){
      		imgLoc=(4*-69) + "px ";
   		}else if (this.rank==="6"){
      		imgLoc=(5*-69) + "px ";
   		}else if (this.rank==="7"){
      		imgLoc=(6*-69) + "px ";
   		}else if (this.rank==="8"){
      		imgLoc=(7*-69) + "px ";
   		}else if (this.rank==="9"){
      		imgLoc=(8*-69) + "px ";
   		}else if (this.rank==="10"){
      		imgLoc=(9*-69) + "px ";
   		}else if (this.rank==="J"){
      		imgLoc=(10*-69) + "px ";
   		}else if (this.rank==="Q"){
      		imgLoc=(11*-69) + "px ";
   		}else if (this.rank==="K"){
      		imgLoc=(12*-69) + "px ";
		}
            
  		if (this.suit=="SPADE"){
    		imgLoc+=(1*-94) + "px"; 
   		}else if (this.suit=="DIAMOND"){
    		imgLoc+=(3*-94) + "px"; 
   		}else if (this.suit=="CLUB"){
    		imgLoc+=(0*-94) + "px"; 
   		}else if (this.suit=="HEART"){
	    	imgLoc+=(2*-94) + "px"; 
   		}
   		return imgLoc;
	}
	
	this.init=function(inRank,inSuit){
		this.rank=inRank;
		this.suit=inSuit; 
		this.imgLoc=this.cardImgLoc();
		return this.rank+this.suit;
	};
	this.init(inRank,inSuit);
}


/******************************************************
* CardDeck object is used to create a full deck and 
*	shuffle the card in the deck as well.
******************************************************/
function CardDeck() {
	this.suits=['HEART','DIAMOND','SPADE','CLUB'];
	this.ranks=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	this.fullDeck= new Array();

	this.dealCard=function(){
		var card=this.fullDeck[0];
		this.fullDeck.splice(0,1);
		return card;
	}

	this.shuffle=function(array){
		var m = array.length, t, i;

		while (m) {

			i = Math.floor(Math.random() * m--);

			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

	this.init=function(){
		for(var s=0; s<this.suits.length; s++){
			for(var r=0; r<this.ranks.length; r++){
				this.fullDeck[this.fullDeck.length]= new Card(this.ranks[r],this.suits[s]);
			}
		}
		this.shuffle(this.fullDeck);
	}

	this.init();
}

/******************************************************
* CardPile object which will be used through out App 
*	to store cards for each pile of cards used in the 
*	game.
******************************************************/
function CardPile() {
	this.pile= new Array();

	this.addCard= function(inCard){
		this.pile[this.pile.length]= inCard;
	}

//	this.giveCard= function(cardID){
//	}

}

/******************************************************
* This a the application Object which will be created.
*	TrashGame handles all gameplay.
******************************************************/
function TrashGame(){
	this.bgImageUrl="url('images/cardDeck.jpg')";
	this.deck = new CardDeck();
	this.disCardPile = new CardPile();
	this.cpuCardPile = new CardPile();
	this.plyrCardPile = new CardPile();
	this.actvCardPile = new CardPile();
	this.plyrCardRemaining=10;
    this.cpuCardRemaining=10;
    this.bCanGetNewCard=true;
    this.currentTurn='PLAYER';
	document.getElementById('cpuCards').style.backgroundColor="#d1d6d1";
	document.getElementById('plyrCards').style.backgroundColor="#afd6b6";
    this.card1="";
    this.card2="";

	this.swapPlayer=function(){
		if(this.currentTurn=='PLAYER'){
			this.currentTurn='CPU';
			document.getElementById('cpuCards').style.backgroundColor="#afd6b6";
			document.getElementById('plyrCards').style.backgroundColor="#d1d6d1";
		}else{
			this.currentTurn='PLAYER';
			document.getElementById('cpuCards').style.backgroundColor="#d1d6d1";
			document.getElementById('plyrCards').style.backgroundColor="#afd6b6";
		}
	}        
	
	this.cpuTurn=function(){

		while(this.currentTurn=='CPU'){
			var bMadePlay=false;

			console.log('CPU TURN 0');
					
			//check for old card.
			if((trshGame.actvCardPile.pile.length>0) && (bMadePlay==false)){
				if (trshGame.actvCardPile.pile[0].rank=='J'){
					//this.swapCard('activeCard','oldPile');
					this.clickCard('activeCard');
					this.clickCard('oldPile');
					bMadePlay=true;					
				}else if (trshGame.actvCardPile.pile[0].rank=='Q'){
					for(i=0;i<trshGame.plyrCardPile.pile.length;i++){
						if(trshGame.plyrCardPile.pile[i].bVisible==true){
							if(trshGame.plyrCardPile.pile[i].rank=='Q'){
								//break;
							}else if(trshGame.plyrCardPile.pile[i].rank=='A'){
								//this.swapCard('activeCard','plyrCard'+i);
								this.clickCard('activeCard');
								this.clickCard('plyrCard'+i);
								bMadePlay=true;	
								break;
							}else if(trshGame.plyrCardPile.pile[i].rank=='K'){
								//this.swapCard('activeCard','plyrCard'+i);
								this.clickCard('activeCard');
								this.clickCard('plyrCard'+i);
								bMadePlay=true;	
								break;
							}else if(trshGame.plyrCardPile.pile[i].rank==(i+1)){
								//this.swapCard('activeCard','plyrCard'+i);
								this.clickCard('activeCard');
								this.clickCard('plyrCard'+i);
								bMadePlay=true;	
								break;
							}
						} //end of if card is visible
					}
				}else if (trshGame.actvCardPile.pile[0].rank=='K'){
					for(i=0;i<trshGame.cpuCardPile.pile.length;i++){
						if(trshGame.cpuCardPile.pile[i].bVisible==false){
							//this.swapCard('activeCard','cpuCard'+i);
							this.clickCard('activeCard');
							this.clickCard('cpuCard'+i);
							bMadePlay=true;	
							break;
						}
					}
				}else if (trshGame.actvCardPile.pile[0].rank=='A' && trshGame.cpuCardPile.pile[0].bVisible==false){
					//this.swapCard('activeCard','cpuCard0');
					this.clickCard('activeCard');
					this.clickCard('cpuCard0');
					bMadePlay=true;	
				}else{
					for(i=0;i<trshGame.cpuCardPile.pile.length;i++){
						if(trshGame.cpuCardPile.pile[i].bVisible==false && trshGame.actvCardPile.pile[0].rank==(i+1)){
							//this.swapCard('activeCard','cpuCard'+i);
							this.clickCard('activeCard');
							this.clickCard('cpuCard'+i);
							bMadePlay=true;	
							break;
						}
					}				
				}
				console.log('CPU TURN 1');
			}else if((trshGame.disCardPile.pile.length>0) && (bMadePlay==false)){
/* left off here!! */			

				if (trshGame.disCardPile.pile[0].rank=='J'){
					// do nothing
				}else if (trshGame.disCardPile.pile[0].rank=='Q'){
					for(i=0;i<trshGame.plyrCardPile.pile.length;i++){
						if(trshGame.plyrCardPile.pile[i].bVisible==true){
							if(trshGame.plyrCardPile.pile[i].rank=='Q'){
								//break;
							}else if(trshGame.plyrCardPile.pile[i].rank=='A'){
								//this.swapCard('oldPile','plyrCard'+i);
								this.clickCard('oldPile');
								this.clickCard('plyrCard'+i);
								bMadePlay=true;	
								break;
							}else if(trshGame.plyrCardPile.pile[i].rank=='K'){
								//this.swapCard('oldPile','plyrCard'+i);
								this.clickCard('oldPile');
								this.clickCard('plyrCard'+i);

								bMadePlay=true;	
								break;
							}else if(trshGame.plyrCardPile.pile[i].rank==(i+1)){
								//this.swapCard('oldPile','plyrCard'+i);
								this.clickCard('oldPile');
								this.clickCard('plyrCard'+i);
								bMadePlay=true;	
								break;
							}
						} //end of if card is visible
					}
				}else if (trshGame.disCardPile.pile[0].rank=='K'){
					for(i=0;i<trshGame.cpuCardPile.pile.length;i++){
						if(trshGame.cpuCardPile.pile[i].bVisible==false){
							//this.swapCard('oldPile','cpuCard'+i);
							this.clickCard('oldPile');
							this.clickCard('cpuCard'+i);
							bMadePlay=true;	
							break;
						}
					}
				}else if (trshGame.disCardPile.pile[0].rank=='A' && trshGame.cpuCardPile.pile[0].bVisible==false){
					//this.swapCard('oldPile','cpuCard0');
					this.clickCard('oldPile');
					this.clickCard('cpuCard0');
					bMadePlay=true;	
				}else{
					for(i=0;i<trshGame.cpuCardPile.pile.length;i++){
						if(trshGame.cpuCardPile.pile[i].bVisible==false && trshGame.disCardPile.pile[0].rank==(i+1)){
							//this.swapCard('oldPile','cpuCard'+i);
							this.clickCard('oldPile');
							this.clickCard('cpuCard'+i);
							bMadePlay=true;	
							break;
						}
					}				
				}


				console.log('CPU TURN 2');			
			}
			
			if((trshGame.actvCardPile.pile.length==0) && (bMadePlay==false)){
				console.log('CPU TURN 3');
				this.getNewCard();
				bMadePlay=true;					
				
			}else if((trshGame.actvCardPile.pile.length>0) && (bMadePlay==false)){
				console.log('CPU TURN 4');
				//this.swapCard('activeCard','oldPile');
				this.clickCard('activeCard');
				this.clickCard('oldPile');
				
				bMadePlay=true;					

			}
	
			console.log('bMadePlay: ' + bMadePlay);				
		} // end of while
	}

    this.winner=function(inWinner){
       	if (inWinner=='CPU'){
       		this.cpuCardRemaining--;
       	}else{
       		this.plyrCardRemaining--;
       	}
       
       	//announce winner
       	//alert('Good job: ' + inWinner);
		displayMsgBox('Good Job!',inWinner + ' has won the match.');
		//set winner as first player next game
       	this.currentTurn=inWinner;
       	
       	//reset board
       	if (this.cpuCardRemaining==0 || this.plyrCardRemaining==0){
			this.gameOver(inWinner);
       	}else{   	
			//reset cards visibility
			for (var i=0; i<this.plyrCardPile.pile.length;i++){
				this.plyrCardPile.pile.bVisible=false;
            	document.getElementById('plyrCard'+i).style.backgroundImage="url('images/cardBack.jpg')";
            }

			for (var i=0; i<this.cpuCardPile.pile.length;i++){
				this.cpuCardPile.pile.bVisible=false;
            	document.getElementById('cpuCard'+i).style.backgroundImage="url('images/cardBack.jpg')";
            }

	       	this.init();
       	}
       	
    }	

	this.gameOver= function(inWinner){
		//alert('Game over.  Congrats to: ' + inWinner);
		displayMsgBox('Game Over', 'Congratulations to the winner: ' + inWinner);
		
	}


	this.routeClick=function(inValue){
		if(inValue=='newPile'){
			this.getNewCard();
		}else{
			this.clickCard(inValue);
		}
		
		if(this.currentTurn=="CPU"){
			this.cpuTurn();
		}
	}

	this.getNewCard=function() {
    	// need to check for bCanGetNewCard=True
    	if (this.bCanGetNewCard==true) {
        	this.actvCardPile.addCard(this.deck.dealCard());
        	this.actvCardPile.pile[0].bSelectable=true;
        	this.actvCardPile.pile[0].bVisible=true;

       
       		//set bCanGetNewCard to false
       		this.bCanGetNewCard=false;

       		this.drawBoard();
    	}else{
       		//notify user they must move their active card first.
       		//alert('cannot get another card!');
       		displayMsgBox('Warning','You cannot get another card at this time.');
    	}    
	}

	this.clickCard=function(inValue){
		this.bCard1Valid=false;
		this.bCard2Valid=false;
		var cardsLeft=0;
		
		// set card values
	    if(this.card1==""){    	
	    	if(this.validateCard1(inValue)){
	    		this.card1=inValue;
	    		this.highlightCard(this.card1);
	    	}
	    }else if(this.card1==inValue){ 
	    		//alert('Cannot play a card upon itself!');
				displayMsgBox('Warning','Cannot play a card upon itself!');
                this.resetClickedCards();
	    }else if(this.card2==""){ 
	        if(this.card1=="oldPile" && inValue=="activeCard"){
	        	this.unHighlightCard(this.card1);
	        	this.card1=inValue;
	        	this.highlightCard(this.card1);
	    	}else if(this.validateCard2(this.card1, inValue)){
	    		this.card2=inValue;
	    		this.highlightCard(this.card2);
				this.swapCard(this.card1, inValue);				
			    //loop through cards to see if user won.
	    		if(this.currentTurn=="PLAYER"){
	    			for (var i=0; i<this.plyrCardPile.pile.length;i++){
						if(this.plyrCardPile.pile[i].bVisible==false){
							cardsLeft++;
						}	    		
	    			}
	    			if(cardsLeft==0){
	    				this.winner('PLAYER');
			    	}
		
	    		}
	    	
			    if(this.currentTurn=="CPU"){
	    			for (var i=0; i<this.cpuCardPile.pile.length;i++){
						if(this.cpuCardPile.pile[i].bVisible==false){
							cardsLeft++;
						}	    		
	    			}	    
	    	
	    			if(cardsLeft==0){
	    				this.winner('CPU');
	    			}
	   		 	}

	    	}
	    }	    
	    
 	} // end of clickCard

	this.resetClickedCards=function(){
	    if (this.card1 != ""){
			document.getElementById(this.card1).style.boxShadow="";
			this.card1="";
		}
	    if (this.card2 != ""){
			document.getElementById(this.card2).style.boxShadow="";
			this.card2="";
		}
	}

 	
 	this.validateCard1 = function(inCard1){
		//check to make sure card1 is active card or discard pile Card
		if ((inCard1=="oldPile" && this.disCardPile.pile.length>0) || inCard1=="activeCard") {
	 		return true;
	 	}else if(inCard1=="oldPile" && this.disCardPile.pile.length==0) {
	 		//alert('There are no card to select from discard pile.');
	 		displayMsgBox('Warning','There are no cards to select from discard pile.');

	 	}else{
	 		return false;
	 	}
 	} //end this.validateCard1

 	this.validateCard2 = function(inCard1, inCard2){
 		var card1Rank='';
 		var card2Rank='';
		var card2Pos='';
		 		
 		if (inCard1=="activeCard"){
	 		card1Rank=this.actvCardPile.pile[0].rank;
 		}else if (inCard1=="oldPile"){
	 		card1Rank=this.disCardPile.pile[0].rank;
 		}
 		
 		if (inCard2=="oldPile"){
	 		card2Rank="D";
 		}else{
 			if (inCard2.substr(0,8)=="plyrCard") {
	 		    card2Pos=inCard2.substr(8,1);
	 		    card2Rank=trshGame.plyrCardPile.pile[card2Pos].rank;
			}else if (inCard2.substr(0,7)=="cpuCard"){
	 		    card2Pos=inCard2.substr(7,1);
	 		    card2Rank=trshGame.cpuCardPile.pile[card2Pos].rank;
			}
 		}
 		console.log('card2Pos: ' + card2Pos);
 		console.log('card2Rank: ' + card2Rank);
 		
		if(card1Rank=="K"){
			if((this.currentTurn=="CPU" && inCard2.substr(0,7)=="cpuCard" && this.cpuCardPile.pile[inCard2.substr(7,1)].bVisible==false) || (this.currentTurn=="PLAYER" && inCard2.substr(0,8)=="plyrCard" && this.plyrCardPile.pile[inCard2.substr(8,1)].bVisible==false)){
				return true;
			}else{
				//alert('You can only play this on your card you have not flipped over yet.');
		 		displayMsgBox('Warning', 'You can only play this on your card you have not flipped over yet.');					
				return false;
			}
		}else if(card1Rank=="Q"){
			if((this.currentTurn=="CPU" && inCard2.substr(0,8)=="plyrCard" && this.plyrCardPile.pile[inCard2.substr(8,1)].bVisible==true) || (this.currentTurn=="PLAYER" && inCard2.substr(0,7)=="cpuCard" && this.cpuCardPile.pile[inCard2.substr(7,1)].bVisible==true)){
				return true;
			}else if(card2Rank=="D"){
				if (this.currentTurn=="CPU"){
					for (var i=0;i<this.plyrCardPile.pile.length; i++){
						if(this.plyrCardPile.pile[i].bVisible==true){
							return false;
						}else{
							return true;
						}
					}
				}
				
				if(this.currentTurn=="PLAYER"){
					for (var i=0;i<this.cpuCardPile.pile.length; i++){
						if(this.cpuCardPile.pile[i].bVisible==true){
							return false;
						}else{
							return true;
						}
					}
				}
			}else{
				
				//alert('You can only play this on your oppenents card they have flipped over.');
		 		displayMsgBox('Warning','You can only play this on your opponents card they have flipped over.');					
				return false;
			}
		}else if(card1Rank=="J"){
			if (card2Rank != "D") {
				//alert('Jacks cannot do anything in this game.  Your only move is to the discard pile.');
		 		displayMsgBox('Warning', 'Jacks cannot do anything in this game.  Your only move is to the discard pile.');					
				return false;
			}else{
				//swap to discard pile
				return true;
				console.log('swap to disCardPile');
			}
		}else if((this.currentTurn=="PLAYER" && inCard2.substr(0,8)=="plyrCard") || (this.currentTurn=="CPU" && inCard2.substr(0,7)=="cpuCard")) {
			// process for #A-10
			if ((card1Rank=="A" && card2Pos=="0") || (card1Rank=="2" && card2Pos=="1") || (card1Rank=="3" && card2Pos=="2") || (card1Rank=="4" && card2Pos=="3") || (card1Rank=="5" && card2Pos=="4") || (card1Rank=="6" && card2Pos=="5") || (card1Rank=="7" && card2Pos=="6") || (card1Rank=="8" && card2Pos=="7") || (card1Rank=="9" && card2Pos=="8") || (card1Rank=="10" && card2Pos=="9")){
			
				if((this.currentTurn=="CPU" && inCard2.substr(0,7)=="cpuCard" && this.cpuCardPile.pile[inCard2.substr(7,1)].bVisible==true) || (this.currentTurn=="PLAYER" && inCard2.substr(0,8)=="plyrCard" && this.plyrCardPile.pile[inCard2.substr(8,1)].bVisible==true)){
					if (card2Rank=="K" || card2Rank=="Q"){
						return true;
					}else{
						//alert('This card is already turned over and will need to go to the discard pile.');
				 		displayMsgBox('Warning', 'This card is already turned over and will need to go to the discard pile.');					
						return false;			
					}
				}else{
					return true;
				}
				
			}else{
				//alert('Must select a card from the same position in your hand.');
				displayMsgBox('Warning', 'Must select a card from the same position in your hand.');
				return false;
			}
		}else if(card2Rank=="D"){
			if (card1Rank=="A"){
				if((this.currentTurn=="PLAYER" && this.plyrCardPile.pile[0].bVisible==true) || (this.currentTurn=="CPU" && this.cpuCardPile.pile[0].bVisible==true)){
					return true;
				}else{
					//alert("This card is playable! Don't discard.");
					displayMsgBox('Warning', "This card is playable! Don't discard.");
					return false;
				}
			}else{
				if((this.currentTurn=="PLAYER" && card1Rank>this.plyrCardPile.pile.length) || (this.currentTurn=="CPU" && card1Rank>this.cpuCardPile.pile.length)){
					return true;
				}else if((this.currentTurn=="PLAYER" && this.plyrCardPile.pile[parseInt(card1Rank)-1].bVisible==true) || (this.currentTurn=="CPU" && this.cpuCardPile.pile[parseInt(card1Rank)-1].bVisible==true)){
					return true;
				}else{
					//alert("This card is playable! Don't discard.");
					displayMsgBox('Warning', "This card is playable! Don't discard.");
					return false;
				}
			}
		}else{
			//alert('Must select a card from the same position in your hand.');
			displayMsgBox('Warning', 'Must select a card from the same position in your hand.');
			return false;
		}
 	} //end this.validateCard2

	this.swapCard = function(inCard1, inCard2){
		console.log('swapCard: ' + inCard1 + ' - ' + inCard2);

		var tmpCard = new Card();
		
		
		if(inCard1=="activeCard"){
			tmpCard = this.actvCardPile.pile[0];
			if(inCard2.substr(0,8)=="plyrCard"){
				this.actvCardPile.pile[0]=this.plyrCardPile.pile[inCard2.substr(8,1)];
				this.actvCardPile.pile[0].bVisible=true;
				this.plyrCardPile.pile[inCard2.substr(8,1)]=tmpCard;
			}else if(inCard2.substr(0,7)=="cpuCard"){
				this.actvCardPile.pile[0]=this.cpuCardPile.pile[inCard2.substr(7,1)];
				this.actvCardPile.pile[0].bVisible=true;
				this.cpuCardPile.pile[inCard2.substr(7,1)]=tmpCard;
			}else if(inCard2=="oldPile"){
				this.actvCardPile.pile.splice(0,1);
				this.disCardPile.pile[0]=tmpCard;
				this.swapPlayer();
			}
		}else if(inCard1=="oldPile"){
			tmpCard = this.disCardPile.pile[0];

			if(inCard2.substr(0,8)=="plyrCard"){
				this.disCardPile.pile.splice(0,1);
				this.actvCardPile.pile.splice(0,0,this.plyrCardPile.pile[inCard2.substr(8,1)]);
				this.actvCardPile.pile[0].bVisible=true;
				this.plyrCardPile.pile[inCard2.substr(8,1)].bVisible=true;
				this.plyrCardPile.pile[inCard2.substr(8,1)]=tmpCard;
			}else if(inCard2.substr(0,7)=="cpuCard"){
				this.disCardPile.pile.splice(0,1);
				this.actvCardPile.pile.splice(0,0,this.cpuCardPile.pile[inCard2.substr(7,1)]);
				this.actvCardPile.pile[0].bVisible=true;
				this.cpuCardPile.pile[inCard2.substr(7,1)].bVisible=true;
				this.cpuCardPile.pile[inCard2.substr(7,1)]=tmpCard;
			}
			
		}
				
    	this.bCanGetNewCard=true;
    	this.card1="";
    	this.card2="";
		this.unHighlightCard(inCard1);
		this.unHighlightCard(inCard2);


		trshGame.drawBoard();
	} // end this.swapCard

 	
 	this.highlightCard = function(inCard){
		document.getElementById(inCard).style.boxShadow="0px 0px 4px 4px rgba(255, 0, 0,0.5)";
 	} //end this.highlightCard

	this.unHighlightCard = function(inCard){
		document.getElementById(inCard).style.boxShadow="";
	} //end this.unHighlightCard
 		
	//This updates the display on the screen.
	this.drawBoard=function(){
        //display player hands
		for (var i=0; i<10; i++){
			if (i<this.cpuCardPile.pile.length){
				document.getElementById('cpuCard'+i).style.visibility='visible';
				if(this.cpuCardPile.pile[i].bVisible==true){
					document.getElementById('cpuCard'+i).style.backgroundImage=this.bgImageUrl;
					document.getElementById('cpuCard'+i).style.backgroundPosition=this.cpuCardPile.pile[i].imgLoc;
					            
				}
			}else{
				document.getElementById('cpuCard'+i).style.visibility='hidden';
			}
			if (i<this.plyrCardPile.pile.length){
				document.getElementById('plyrCard'+i).style.visibility='visible';
				if(this.plyrCardPile.pile[i].bVisible==true){
					document.getElementById('plyrCard'+i).style.backgroundImage=this.bgImageUrl;
					document.getElementById('plyrCard'+i).style.backgroundPosition=this.plyrCardPile.pile[i].imgLoc;            					
				}
				
			}else{
				document.getElementById('plyrCard'+i).style.visibility='hidden';
			}
		}
			
		//display for newPile
		if (this.deck.fullDeck.length>0){
			document.getElementById('newPile').style.visibility='visible';
		}else{
			document.getElementById('newPile').style.visibility='hidden';
		}

           //display for activePile
		if(this.actvCardPile.pile.length>0){
			if(this.actvCardPile.pile[0].bVisible==true){
				document.getElementById('activeCard').style.visibility='visible';
				document.getElementById('activeCard').style.backgroundImage=this.bgImageUrl;
				document.getElementById('activeCard').style.backgroundPosition=this.actvCardPile.pile[0].imgLoc;            					

			}else{
				document.getElementById('activeCard').style.visibility='hidden';
			}
		}else{
				document.getElementById('activeCard').style.visibility='hidden';
		}

		//display disCardPile
		document.getElementById('oldPile').style.visibility='visible';
		if(this.disCardPile.pile.length==0){
			document.getElementById('oldPile').style.backgroundColor ="rgba(255, 0, 0,0.5)";			
			document.getElementById('oldPile').style.backgroundSize="0px";			
		}else{
			document.getElementById('oldPile').style.backgroundSize="";										
			document.getElementById('oldPile').style.backgroundImage=this.bgImageUrl;
			document.getElementById('oldPile').style.backgroundPosition=this.disCardPile.pile[0].imgLoc;            					

		}
	
	}  //end of this.drawBoard()
	
    
    this.init=function(){
		this.deck = new CardDeck();
		this.disCardPile = new CardPile();
		this.cpuCardPile = new CardPile();
		this.plyrCardPile = new CardPile();
		this.actvCardPile = new CardPile();
        if (this.card1 !="") {
			this.unHighlightCard(this.card1);
			this.card1="";
        }
        if (this.card2 !="") {
			this.unHighlightCard(this.card2);
			this.card2="";
        }

	    this.bCanGetNewCard=true;		
    
    	for (var i=0; i<(this.cpuCardRemaining+this.plyrCardRemaining);i++){    	
        	if (i<this.cpuCardRemaining) {
        		this.cpuCardPile.addCard(this.deck.dealCard());
        	}else if((i>=this.cpuCardRemaining) && (i<this.cpuCardRemaining+this.plyrCardRemaining)) {
        		this.plyrCardPile.addCard(this.deck.dealCard());
        	}
    	}
    	
    	//reset images on screen
		this.drawBoard();
		
		if(this.currentTurn=="CPU"){
			this.cpuTurn();
		}
    } // end of this.init()
    
    this.init();
    
} //end of TrashGame


/******************************************************
* Create TrashGame object and create Event listeners
*	for clicks on yeah card on the screen.
******************************************************/
var trshGame = new TrashGame();
displayMsgBox('Welcome to Trash', 'It is your turn.');

for (var i=0; i<document.getElementsByClassName('card').length; i++){
	document.getElementsByClassName('card')[i].addEventListener('click', function(e){ trshGame.routeClick(this.id);},false);
}


function closeMsgBox(){
	document.getElementsByClassName('transBG')[0].style.visibility='hidden';
	document.getElementsByClassName('msgBox')[0].style.visibility='hidden';
  	if (trshGame.cpuCardRemaining==0 || trshGame.plyrCardRemaining==0){
  		location.reload();
	}
}

function displayMsgBox(strHead,strBody){
//	document.getElementsByClassName('msgBox')[0].style.top=((window.innerWidth-300)/2) +'px';
	document.getElementsByClassName('msgBox')[0].style.left=((window.innerWidth-300)/2) +'px';
    
	document.getElementById('msgHeadText').textContent=strHead;
	document.getElementById('msgBodyText').textContent=strBody;
	document.getElementsByClassName('transBG')[0].style.visibility='visible';
	document.getElementsByClassName('msgBox')[0].style.visibility='visible';
}
