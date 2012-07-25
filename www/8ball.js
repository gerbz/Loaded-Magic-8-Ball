var debug = false;
var loadedDefault = 15;
var numberOfShakes = 0;
var sameShakeCount = 0;
var gameOn;
var lastShake;
var easter;

// Random number generator
//http://stackoverflow.com/a/1527820/345599
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start watching the acceleration
//
function startWatch() {

    // Update acceleration every 3 seconds
    var options = { frequency: 100 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;	
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    
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
    if(gameOn == true || acceleration.x > 4){

    	// Once we start counting, the shakes dont need to be so hard to count
    	gameOn = true;
		
    	// Spin the blank image
    	var msgDiv = document.getElementById("message");
    	msgDiv.setAttribute("class", "msgSpin");
    	msgDiv.setAttribute("style", "margin-top:-120px;");
    	document.getElementById("msgimg").setAttribute("src", "img/iPadMessageBlank.png");
    	
    	// A "shake" means it crossed the x2 threshold
    	var shake;
        if(acceleration.x > 2){
        	shake = true;
        }else if(acceleration.x < 2){
        	shake = false;
        }
    }
    
    // Pass the shake to the counter
    countShakes(shake);

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

function countShakes(shake){
    
    // Count up the shakes if its different from the last shake
    // If the shake changed, reset the same shake counter
    if(shake != lastShake){
    	numberOfShakes++;
    	sameShakeCount = 0;
    }else{
    	
    	// Count how many times a shake did _not_ happen
    	sameShakeCount++;
    	
    	// If they do not shake for 1 second, they are done shaking
    	if(sameShakeCount > 10 && gameOn == true){
			
			// Stop spinning and recenter
			var msgDiv = document.getElementById("message");
			msgDiv.setAttribute("style", "");
			msgDiv.setAttribute("class", "");
			
			// Get the image element to swap it out later
			var msgImg = document.getElementById("msgimg");

    		//Get a random number to determine which message to display
    		var random = getRandomInt(0, 4);
    		console.log(random);
    		
    		// Begin deciding which message to display
    		// Easter egg trumps all options
    		if(easter == true){
    		    console.log('egg');
    			msgImg.setAttribute("src", "img/iPadMessage1m.png");
    			easter = false;
    		
    		}
    		// Display the maybe message if # is 0 or 4
    		else if(random == 4 || random == 0){
    			
    			// Pick the message based on the random number
    			switch(random){
    				case 0:
    				  console.log('maybe');
    				  msgImg.setAttribute("src", "img/iPadMessage1m.png");
    				  break;
    				case 4:
    				  console.log('maybe');
    				  msgImg.setAttribute("src", "img/iPadMessage2m.png");
    				  break;
    				default:
    				  console.log('maybe');
    				  msgImg.setAttribute("src", "img/iPadMessage3m.png");
    				  break;
    			}
    			
    		// If they shook more than the default, the answer is yes
    		}else if(numberOfShakes > loadedDefault){
    			console.log('yes!');
    	
    			// Pick the message based on the random number
    			switch(random){
    				case 1:
    				  console.log('yeah totally');
    				  msgImg.setAttribute("src", "img/iPadMessage1y.png");
    				  break;
    				case 2:
    				  console.log('thats correct');
    				  msgImg.setAttribute("src", "img/iPadMessage2y.png");
    				  break;
    				case 3:
    				  console.log('fosho!');
    				  msgImg.setAttribute("src", "img/iPadMessage3y.png");
    				  break;
    				default:
    				  console.log('fosho!');
    				  msgImg.setAttribute("src", "img/iPadMessage3y.png");
    				  break;
    			}				
    			 
    		// If they shook less than the default, the answer is no
    		// Dont set it to anything when the app first loads (>3)        		
    		}else if(numberOfShakes > 3 && numberOfShakes < loadedDefault){
    			console.log('no...');
    		
    			// Pick the message based on the random number
    			switch(random){
    				case 1:
    				  console.log('no way');
    				  msgImg.setAttribute("src", "img/iPadMessage1n.png");
    				  break;
    				case 2:
    				  console.log('I think not');
    				  msgImg.setAttribute("src", "img/iPadMessage2n.png");
    				  break;
    				case 3:
    				  console.log('not a chance');
    				  msgImg.setAttribute("src", "img/iPadMessage3n.png");
    				  break;
    				default:
    				  console.log('not a chance');
    				  msgImg.setAttribute("src", "img/iPadMessage3n.png");
    				  break;
    			}
    		}
    		
    		// Reset for a fresh shake
    		gameOn = false;
    		numberOfShakes = 0;
    		
    	}
    	//console.log(sameShakeCount);
    }
    
    // Remember the last shake for next time
    lastShake = shake;

}