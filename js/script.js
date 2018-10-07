function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
 }
 function Element() {
    this.letter = sd();
    this.coordX = Math.abs( Math.floor(randomInteger(40, window.innerWidth * 0.7)) );
    //console.log(this.coordX);
	this.html = document.createElement('span');
	var number = randomInteger(0, 3);
	if(number == 1) {
		this.html.className = 'item green';
	} else if(number == 2) {
		this.html.className = 'item red';
	} else if(number == 3) {
		this.html.className = 'item blue';
	} else this.html.className = 'item'; //если генериться 0 !!!
	this.html.innerHTML = this.letter;
	this.html.style.left = this.coordX + 'px';
	return this.html;
}
function sd() {
	var numletter = Math.floor(Math.random() * letters.length);
	var isletter = letters.substring(numletter, numletter + 1);
	if(letters !== '') {
		letters = letters.replace(isletter,'');
	} else {
		//alert('You Win');
		//StopGame();
	}
	return isletter;
}

function MyGame() {
	console.log('MyGame function started!');
	document.getElementsByTagName('input').item(0).setAttribute('onclick','alert("Pause")');

	var StopGamePossible = true;

	var wrapper = document.getElementById('id1');// document.getElementsByTagName('div').item(0);
	letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var items = new Array;
	var counter;
	counter = 1;
	items[0] = new Element();
	wrapper.appendChild(items[0]);
	items[0].style.top = 25 + 'px';
	var k = 0;

	var StopBut = setInterval(function(){
		if(k < 3){
			k++;
		}
		else{

			items[counter] = new Element();
			wrapper.appendChild(items[counter]);
			items[counter].style.top = 25 + 'px';		
			counter++;
			k = 0;
		}

		lifes = parseInt(document.getElementsByTagName('p').item(0).innerHTML, 10);
		points = parseInt(document.getElementsByTagName('p').item(1).innerHTML, 10);
		var key;
		document.body.onkeydown = function(event){
			if (StopGamePossible){
				key = String.fromCharCode(event.keyCode);

				var count = letters.length;
				var rand = Math.abs(Math.floor(randomInteger(0, count)));
				var str = letters.substring(rand);
				var len = items.length;
				var coincidence = false;
				for(i = 0; i < len; i++){
					if(items[i].innerHTML == key) {
						coincidence = true;

						items[i].style.top = 0 + 'px';
						items[i].style.display = 'none';
						
						letters = letters.substring(0, rand) + items[i].innerHTML + str;

						items.splice(i, 1);
						len--;
						counter--;

						points = points + 10;
						document.getElementsByTagName('p').item(1).innerHTML = points;
					} 
				}
				if (!coincidence) {
					if (points > 0) {
						if ((points-15) < 0) points = 0;
						else {
							points = points - 15;
							document.getElementsByTagName('p').item(1).innerHTML = points;
						}
					} else { //////////////////////else START
						lifes--;
						if (lifes > 0){
							document.getElementsByTagName('p').item(0).innerHTML = lifes;
							}
						else {
							var Stop = function (){
							clearInterval(StopBut);
							for (i = 0; i < items.length; i++){
								items[i].parentNode.removeChild(items[i]);
								delete items[i];
							}
							document.getElementsByTagName('p').item(0).innerHTML = 5;
							document.getElementsByTagName('p').item(1).innerHTML = 0;
							document.getElementsByTagName('input').item(0).setAttribute('onclick','MyGame()');
							};
							clearInterval(StopBut);
							alert('GAME OVER!!!   Your score = ' + points);
							for (i = 0; i < items.length; i++){
								items[i].parentNode.removeChild(items[i]);
								delete items[i];
							}
							document.getElementsByTagName('p').item(0).innerHTML = 5;
							document.getElementsByTagName('p').item(1).innerHTML = 0;
							document.getElementsByTagName('input').item(0).setAttribute('onclick','MyGame()');
							StopGamePossible = false;
						}
						//////////////////////////else END
					}
				}
			} else return;
		}
		
		var len = items.length;
		for(i = 0; i < len; i++){
			//console.table(items[i].style.top);
			if ( parseInt(items[i].style.top, 10) < window.innerHeight - 70 ) {
				if(items[i].style.display != 'none') {
					items[i].style.top = (parseInt(items[i].style.top, 10) + 10) + 'px';
				}
				if (window.event) {
					alert(event.keyCode)
				}
			} else {
				items[i].style.top = 0+'px';
				items[i].style.display = 'none';

				items.splice(i, 1);
				len--;
				counter--;

				lifes--;
				if (lifes > 0){
					document.getElementsByTagName('p').item(0).innerHTML = lifes;
					}
				else {
					var Stop = function (){
					clearInterval(StopBut);
					for (i = 0; i < items.length; i++){
						items[i].parentNode.removeChild(items[i]);
						delete items[i];
					}
					document.getElementsByTagName('p').item(0).innerHTML = 5;
					document.getElementsByTagName('p').item(1).innerHTML = 0;
					document.getElementsByTagName('input').item(0).setAttribute('onclick','MyGame()');
					//items[i].style.top = 0+'px';
					};
					clearInterval(StopBut);
					alert('GAME OVER!!!   Your score = ' + points);
					for (i = 0; i < items.length; i++){
						items[i].parentNode.removeChild(items[i]);
						delete items[i];
					}
					document.getElementsByTagName('p').item(0).innerHTML = 5;
					document.getElementsByTagName('p').item(1).innerHTML = 0;
					document.getElementsByTagName('input').item(0).setAttribute('onclick','MyGame()');
					StopGamePossible = false;
				}
			}
		}	
		return items[counter];	
		}, 200); //200
//	if (end)
	//var StopSourse - оглашаем в начале функции MyGame()!!!
	var StopSourse = document.getElementsByTagName('input').item(1); //для остановки игры

	StopSourse.onclick = function() {
		if (StopGamePossible){
			StopGame();
		} else return;
	};

	var StopGame = function(){
		clearInterval(StopBut);
		for (i = 0; i < items.length; i++){
			//console.log('items.lenght = ' + items.length);
			items[i].parentNode.removeChild(items[i]);
			delete items[i];
		}
		document.getElementsByTagName('p').item(0).innerHTML = 5;
		document.getElementsByTagName('p').item(1).innerHTML = 0;
		document.getElementsByTagName('input').item(0).setAttribute('onclick','MyGame()');
		alert('Результат: всего очков = ' + points + ', жизней = ' + lifes); //// allert - здесь!!!

		StopGamePossible = false;
		return;
	};  
}
