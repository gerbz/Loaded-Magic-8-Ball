/*
TO-DO
-iPad App icpm
-iPad splash screen

-iPhone App icon
-iPhone splash screen

-More yes and no options based on number of spins
-Some maybe answers randomly



*/

	var loadedDefault = 15;
	var numberOfShakes = 0;
	var sameShakeCount = 0;
	var gameOn;
	var lastShake;
	
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
        	if(sameShakeCount > 10){

        		// If they shook more than the default, the answer is yes
        		if(numberOfShakes > loadedDefault){
        			console.log('yes!');
        			        			
        			var theMsgY = document.getElementById("message");
					theMsgY.setAttribute("class", "msg1y");
					theMsgY.setAttribute("style", "margin-top:-90px;");
        			 
        		// If they shook less than the default, the answer is no
        		// Dont set it to anything when the app first loads (>3)        		
        		}else if(numberOfShakes > 3 && numberOfShakes < loadedDefault){
        			console.log('no...');
        			
        			var theMsgN = document.getElementById("message");
					theMsgN.setAttribute("class", "msg1n");
					theMsgN.setAttribute("style", "margin-top:-90px;");
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