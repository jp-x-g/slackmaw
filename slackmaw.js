// ==UserScript==
// @name     Slackmaw
// @version  0.1
// @grant    GM.getValue
// @grant    GM.setValue
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// ==/UserScript==
// JPxG, 2022 January 9

( function() {

  
  var allPosts = [];
  var allPostsCheck = []
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // What to do if it's a slack page.
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  
  if (window.location.href.indexOf("app.slack.com") >= 0){
    	//alert("Running a script, wow");
    
    
   	function scrapeDown() {
		    //	var newestHTML = document.createElement('div');
      	//	newerHTML.innerHTML = '<div id="woof">woof</div';
      	//	document.getElementsByClassName('p-top_nav__sidebar')[0].appendChild(newestHTML);
      //console.log("Trying to scrape down");
     //document.getElementsByClassName('p-message_pane')[0].scrollTop += 20; 
      msgs = document.getElementsByClassName('c-message_kit__gutter')
      console.log(allPosts.length)
      lastSender = "null";
      lastLastSender = "null";
      for (m = 0; m < msgs.length; m++) {
        //timestamp = msg.getElementsByClassName('c-message_kit__text')[0]
        //console.log(timestamp.innerHTML)
        try{
          setLast = 0
          try {
            lastSender = document.getElementsByClassName('c-message_kit__gutter')[m].getElementsByClassName('c-message__sender_link')[0].innerHTML
            lastSender = lastSender.replaceAll('<span aria-label="(opens in new tab)"></span>','');
            setLast = 1
          } catch(e) {lastSender = lastLastSender;}
          lastLastSender = lastSender;
          timestamp = document.getElementsByClassName('c-message_kit__gutter')[m].getElementsByClassName('c-timestamp')[0].getAttribute("data-ts");
					//timestamp = document.getElementsByClassName('c-message_kit__gutter')[m].getElementsByClassName('c-timestamp__label')[0].innerHTML;
        	text = document.getElementsByClassName('c-message_kit__gutter')[m].getElementsByClassName('c-message_kit__text')[0].innerHTML
          if(setLast == 1) {message = "[" + timestamp + "]< " + lastSender + "> " + text;}
          if(setLast == 0) {message = "[" + timestamp + "]<*" + lastSender + "> " + text;}
          if (allPostsCheck.includes(message.replaceAll("]<*", "]< ")) == false) {
            allPosts.push(message);
            allPostsCheck.push(message.replaceAll("]<*", "]< "));
            console.log(allPosts.length);
            document.getElementById("scrapebutton").innerHTML = "scrape " + String(allPosts.length);
          }	// Append if not already in it.
        } catch(e) {}
      } // for msgelement
    } // scrapeDown
    
    function saveToDisk() {
    var blob = new Blob([allPosts.join("\n")], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "slack-scrape.txt");
  	} // Save all the shite to disk.
  
  
    function autoScrape() {
      //alert(document.getElementsByClassName('p-message_pane').length);
      document.getElementById("scrapeButton").style = "font-family: monospace; padding: 1px 1px 1px 1px; width: 5em; font-size:75%; color:red";
      setInterval(scrapeDown, 100);
    } // autoScrape
    
	   function makebuttons() {
	     //console.log("hi");
	     if(!document.getElementById("scrapeButton")) {
	       // If it doesn't already exist.
		    	var newerHTML = document.createElement('div');
	  	  	newerHTML.innerHTML = '<div id="gmSomeID"><button type="button" id="scrapeButton" class="clbutton">scrape</button><button type="button" id="saveButton" class="svbutton">save</button></div>'
	    		//alert(document.getElementsByClassName('p-top_nav__sidebar')[0]); 
	    		document.getElementsByClassName('p-top_nav__sidebar')[0].appendChild(newerHTML);
	    		document.getElementById("scrapeButton").addEventListener("click", autoScrape);
	    		document.getElementById("saveButton").addEventListener("click", saveToDisk);
	    		document.getElementById("scrapeButton").style = "font-family: monospace; padding: 1px 1px 1px 1px; width: 5em; font-size:75%";
	    		document.getElementById("saveButton").style = "font-family: monospace; padding: 1px 1px 1px 1px; width: 5em; font-size:75%";
  	   } // If it doesn't already exist
    	} // makebuttons
      
 		timeoutDisplay = setInterval(makebuttons, 500);
  } // End of what to do if it's a slack page.
 
})(); // End of the line.
