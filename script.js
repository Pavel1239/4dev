	alert('You Win');
function Element() {
    this.letter = function(){
			var numletter = Math.floor(Math.random() * letters.length);
			var isletter = letters.substring(numletter,numletter+1);
			if(letters !== '') {
				letters = letters.replace(isletter,'');
			} else {
				alert('You Win');
				StopGame();
			}
			return isletter;
			}
    this.coordX = Math.abs(Math.floor(Math.random() * window.innerWidth-170));
	this.html = document.createElement('span');
	this.html.className = 'item';
	this.html.innerHTML = this.letter();
	this.html.style.left = this.coordX+'px';
	return this.html;
}


function MyGame() {
	document.getElementsByTagName('input').item(0).setAttribute('onclick','alert("Pause")');
	var wrapper = document.getElementsByTagName('div').item(0);
	letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var items = new Array;
	var counter;
	counter = 1;
	items[0] = new Element();
	wrapper.appendChild(items[0]);
	items[0].style.top = 0+'px';
	var k;
	k=0;
	var StopBut = setInterval(function(){
		if(k<10){
			k=k+1;
		}
		else{
			items[counter] = new Element();
			wrapper.appendChild(items[counter]);
			items[counter].style.top = 0+'px';		
			counter = counter + 1;
			k=0;
		}
		lifes = parseInt(document.getElementsByTagName('p').item(0).innerHTML, 10);
		points = parseInt(document.getElementsByTagName('p').item(1).innerHTML, 10);
		var key;
		document.body.onkeydown = function(event){
			key = String.fromCharCode(event.keyCode);
			for(i=0;i<items.length;i++){
				if(items[i].innerHTML == key) {					
					items[i].style.top = 0+'px';
					items[i].style.display = 'none';
					points = points + 10;
					document.getElementsByTagName('p').item(1).innerHTML = points;
					}
				}
		}
			
		for(i=0;i<items.length;i++){
			if(parseInt(items[i].style.top, 10)<window.innerHeight-55) {
				items[i].style.top = (parseInt(items[i].style.top, 10) + 5)+'px';
				if (window.event){alert(event.keyCode)}
			} else {
				items[i].style.top = -1000+'px';
				items[i].style.display = 'none';
				lifes = lifes - 1;
				if(lifes>0){
					document.getElementsByTagName('p').item(0).innerHTML = lifes;
					}
				else {
					clearInterval(StopBut);
					alert('GAME OVER');	
					}
				}
			
			
		}	
		return items[counter];	
		}, 200);	
	var StopSourse = document.getElementsByTagName('input').item(1);
	StopSourse.onclick = function(){
		StopGame();
		alert('points = '+points+',lifes = '+lifes);
		};   
		
	var StopGame = function(){
		clearInterval(StopBut);
		for (i=0;i<items.length;i++){
			items[i].parentNode.removeChild(items[i]);
			delete items[i];
			}
		document.getElementsByTagName('p').item(0).innerHTML = 10;
		document.getElementsByTagName('p').item(1).innerHTML = 0;
		document.getElementsByTagName('input').item(0).setAttribute('onclick','MyGame()');
		items[i].style.top = 0+'px';
		};   

	}