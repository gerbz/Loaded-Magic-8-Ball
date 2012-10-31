var debug = false;
var loadedDefault = 15;
var numberOfShakes = 0;
var sameShakeCount = 0;
var gameOn;
var lastShake;
var easter;

// Yes Messages
var msgY = [
	'Most definitely',
	'Positively',
	'Fo real fo sho!',
	'Sounds good',
	'Go for it!'
];

// No Messages
var msgN = [
	'Aw hell no!',
	'No chance',
	'Don\'t count on it',
	'Bad idea',
	'No way Jose'
];

// Maybe Messages
var msgM = [
	'Ask Siri',
	'OMG IDK! BRB =/'
];

// Easter Egg Messages
var msgE = [
	'#iOSDevCamp<br>FTW!'
];

// Blank Messages
var msgB = [
	'Shake Me'
];

// Random number generator
//http://stackoverflow.com/a/1527820/345599
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start watching the acceleration
function startWatch() {
    // Update acceleration every 10 miliseconds
    var options = { frequency: 100 };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;	
    }
}

// A read of every accelerameter response
function onSuccess(acceleration) {
    
    acceleration.x = parseInt(acceleration.x);
    
    //DEBUG display the accelerometer info
    if(debug){
	    var element = document.getElementById('accelerometer');
	    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
	                        'Acceleration Y: ' + acceleration.y + '<br />' +
	                        'Acceleration Z: ' + acceleration.z + '<br />' +
	                        'Timestamp: '      + acceleration.timestamp + '<br />';
    
    	// show the # of shakes
    	var shakes = document.getElementById('shakes');
    	shakes.innerHTML = numberOfShakes;
    
    }

    // Start counting shakes on the first good "hard" shake
    if(gameOn == true || acceleration.x > 6 || acceleration.x < -6){

    	// Once we start counting, the shakes dont need to be so hard to count
    	gameOn = true;
		
    	// Spin the message
    	var msgDiv = document.getElementById("message");
    	msgDiv.setAttribute("class", "msgSpin");
    	msgDiv.innerHTML = msgB[0];
    	
    	// A "shake" means it crossed the x2 threshold
    	var shake;
        if(acceleration.x > 2){
        	shake = true;
        }else{
        	shake = false;
        }
    }
    
    // Pass the shake to the counter
    countShakes(shake,acceleration.x);

}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}

// Easter egg!
function egg(){
	easter = true;
	console.log('egg hit!');
}

function countShakes(shake,x){
    
    // Count up the shakes if its different from the last shake
    // If the shake changed, reset the same shake counter
    if(shake != lastShake){
    	numberOfShakes++;
    	sameShakeCount = 0;
    }else{
    	
    	// Count how many times a shake did _not_ happen
    	sameShakeCount++;   	
    	
    	// If they do not shake for 1 second, then they're done shaking
    	if(sameShakeCount > 10 && gameOn == true){
			
			// Get the message element
			var msgDiv = document.getElementById("message");
			
			// Stop spinning
			msgDiv.setAttribute("class", "message");
    		
    		// Begin deciding which message to display
			// If they are holding it sideways, insert default message (this is a UX bug fix)
	    	if(x > 4 || x < -4){

				msgDiv.innerHTML = msgB[0];

	    	}else{
	    	
		    	//Get a random number to determine which message to display
	    		var random = getRandomInt(0, 6);
	    		console.log(random);
	 		    		
	    		
	    		// Easter egg trumps all options
	    		if(easter == true){
	    		    console.log(msgE[0]);
	    			msgDiv.innerHTML = msgE[0];
	    			easter = false;
	    		
	    		}
	    		// Display the maybe message if # is 0 or 6
	    		else if(random == 0 || random == 6){
	    			console.log('maybe');
	    			
	    			// Pick the message based on the random number
	    			switch(random){
	    				case 0:
	    				  console.log(msgM[0]);
	    				  msgDiv.innerHTML = msgM[0];
	    				  break;
	    				case 6:
	    				  console.log(msgM[1]);
	    				  msgDiv.innerHTML = msgM[1];
	    				  break;
	    				default:
						  console.log('should never get here!');
	    				  break;
	    			}
	    		}
	    		// If they shook more than the default, the answer is yes
	    		else if(numberOfShakes >= loadedDefault){
	    			console.log('yes!');
	    	
	    			// Pick the message based on the random number
	    			switch(random){
	    				case 1:
	    				  console.log(msgY[0]);
	    				  msgDiv.innerHTML = msgY[0];
	    				  break;
	    				case 2:
	    				  console.log(msgY[1]);
	    				  msgDiv.innerHTML = msgY[1];
	    				  break;
	    				case 3:
	    				  console.log(msgY[2]);
	    				  msgDiv.innerHTML = msgY[2];
	    				  break;
	    				case 4:
	    				  console.log(msgY[3]);
	    				  msgDiv.innerHTML = msgY[3];
	    				  break;
	    				case 5:
	    				  console.log(msgY[4]);
	    				  msgDiv.innerHTML = msgY[4];
	    				  break;
	    				default:
	    				  console.log('should never get here!');
	    				  break;
	    			}				
	    			 
	    		// If they shook less than the default, the answer is no
	    		// If its less than three default back to shake me      		
	    		}else if(numberOfShakes > 3 && numberOfShakes < loadedDefault){
	    			console.log('no...');
	    		
	    			// Pick the message based on the random number
	    			switch(random){
	    				case 1:
	    				  console.log(msgN[0]);
	    				  msgDiv.innerHTML = msgN[0];
	    				  break;
	    				case 2:
	    				  console.log(msgN[1]);
	    				  msgDiv.innerHTML = msgN[1];
	    				  break;
	    				case 3:
	    				  console.log(msgN[2]);
	    				  msgDiv.innerHTML = msgN[2];
	    				  break;
	    				case 4:
	    				  console.log(msgN[3]);
	    				  msgDiv.innerHTML = msgN[2];
	    				  break;
	    				case 5:
	    				  console.log(msgN[4]);
	    				  msgDiv.innerHTML = msgN[2];
	    				  break;
	    				default:
	    				  console.log('should never get here!');
	    				  break;
	    			}
	    		}
	    		
	    		// Reset for a fresh shake
	    		gameOn = false;
	    		numberOfShakes = 0;
    		
    		}// end if not holding it sideways
    		
    	}// end if stopped shaking
    	
    }// end if the shake is different
    
    // Remember the last shake for next time
    lastShake = shake;

}