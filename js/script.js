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
	this.html.className = 'item';
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
				
				//console.log('letters ' + letters);

				var count = letters.length;
				//console.log('letters count= ' + count);
				var rand = Math.abs(Math.floor(randomInteger(0, count)));
				//console.log('rand(0, ' + count +') = ' + rand);
				var str = letters.substring(rand);
				//console.log(' str= ' + str);
				var len = items.length;

				for(i = 0; i < len; i++){
					//console.log('items.length= ' + items.length);
					if(items[i].innerHTML == key) {					
						items[i].style.top = 0 + 'px';
						items[i].style.display = 'none';
						
						//console.log('substr= ' + letters.substring(0, rand));
						letters = letters.substring(0, rand) + items[i].innerHTML + str;
						//console.log('Result letters= ' + letters);

						items.splice(i, 1);
						len--;
						counter--;

						points = points + 10;
						document.getElementsByTagName('p').item(1).innerHTML = points;
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


 function displayResult()
{
document.body.style.backgroundImage="url('img/setka2.jpg')";
document.body.style.backgroundRepeat="repeat-x"; 
localStorage.background = document.body.style.backgroundImage="url('img/setka2.jpg')";

if (localStorage.background !== undefined) {
	        document.documentElement.style.backgroundImage = localStorage.background;
	    }

}

 function ChangeBg()
{
document.body.style.backgroundImage="url('img/setka.jpg')";
document.body.style.backgroundRepeat="repeat"; 
localStorage.background = document.body.style.backgroundImage="url('img/setka.jpg')";


if (localStorage.background !== undefined) {
	        document.documentElement.style.backgroundImage = localStorage.background;
	    }

}
