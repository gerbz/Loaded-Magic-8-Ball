/*
TO-DO
-iPad App icpm
-iPad splash screen

-iPhone App icon
-iPhone splash screen

-More yes and no options based on number of spins
-Some maybe answers randomly

BUGS
-Holding in landscape acts nuts

*/

	var loadedDefault = 15;
	var numberOfShakes = 0;
	var sameShakeCount = 0;
	var gameOn;
	var lastShake;
	var maybe = false;

// Random number generator
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
        
        // DEBUG display the accelerometer info
        //var element = document.getElementById('accelerometer');
        //element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />';
                            //'Acceleration Y: ' + acceleration.y + '<br />' +
                            //'Acceleration Z: ' + acceleration.z + '<br />' +
                            //'Timestamp: '      + acceleration.timestamp + '<br />';

		// Start counting shakes on the first good "hard" shake
		if(gameOn == true || acceleration.x > 4){
			
			// Spin the image if its not already spinning
			var msgClass = document.getElementById("message").getAttribute("class");
			if(msgClass != 'msgBlank'){
				var theMsg = document.getElementById("message");
				theMsg.setAttribute("class", "msgBlank");
				theMsg.setAttribute("style", "margin-top:-120px;");
				
			}
			
			// Once we start counting, the shakes dont need to be so hard to count
			gameOn = true;
			
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

        		// Get the image element and recenter it
        		var theMsgY = document.getElementById("message");
        		theMsgY.setAttribute("style", "margin-top:-90px;");

				//Get a random number to determine which message to display
				var random = getRandomInt(0, 4);
				console.log(random);
				
				// Display the maybe message if # is 0 or 4
				var maybe = false;
				if(random == 4 || random == 0){
				
					var maybe = true;
					
        			// Pick the message based on the random number
        			switch(random){
						case 0:
						  console.log('maybe');
						  theMsgY.setAttribute("class", "msg1m");
						  break;
						case 4:
						  console.log('maybe');
						  theMsgY.setAttribute("class", "msg2m");
						  break;
						default:
						  console.log('maybe');
						  theMsgY.setAttribute("class", "msg2m");
						  break;
					}
				}

				
        		// If they shook more than the default, the answer is yes
        		if(numberOfShakes > loadedDefault && maybe != true){
        			console.log('yes!');
			
        			// Pick the message based on the random number
        			switch(random){
						case 1:
						  console.log('yeah totally');
						  theMsgY.setAttribute("class", "msg1y");
						  break;
						case 2:
						  console.log('thats correct');
						  theMsgY.setAttribute("class", "msg2y");
						  break;
						case 3:
						  console.log('fosho!');
						  theMsgY.setAttribute("class", "msg3y");
						  break;
						default:
						  console.log('fosho!');
						  theMsgY.setAttribute("class", "msg3y");
						  break;
					}				
        			 
        		// If they shook less than the default, the answer is no
        		// Dont set it to anything when the app first loads (>3)        		
        		}else if(numberOfShakes > 3 && numberOfShakes < loadedDefault && maybe != true){
        			console.log('no...');
        			var maybe = false;
        		
        			// Pick the message based on the random number
        			switch(random){
						case 1:
						  console.log('no way');
						  theMsgY.setAttribute("class", "msg1n");
						  break;
						case 2:
						  console.log('I think not');
						  theMsgY.setAttribute("class", "msg2n");
						  break;
						case 3:
						  console.log('not a chance');
						  theMsgY.setAttribute("class", "msg3n");
						  break;
						default:
						  console.log('not a chance');
						  theMsgY.setAttribute("class", "msg3n");
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
        
        // Debug code to show the # of shakes
        //var shakes = document.getElementById('shakes');
        //shakes.innerHTML = numberOfShakes;
	}