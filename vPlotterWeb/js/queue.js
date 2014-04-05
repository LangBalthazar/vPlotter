var STATUS_PHP = '../vPlotterAPI/status.php';

function request(url,callback){
 	var xhr = new XMLHttpRequest();
  	xhr.onreadystatechange = ( function(myxhr){
    	return function(){
      		callback(myxhr);
    	}
  	})(xhr);
  	xhr.open('GET',url, true);
  	xhr.send('');
};

var counter = 0;
function checkStatus(){
	request(STATUS_PHP, function(result){
  		var rawJson = result.response;
  		var status = JSON.parse(rawJson);
  		var queue = status['queue'];

  		var oldStatus = document.getElementById('queue');
  		if(oldStatus.childNodes.length != queue.length){
        while (oldStatus.firstChild) {
    			oldStatus.removeChild(oldStatus.firstChild);
        }

        for(var i=0;i<queue.length;i++){
  			  var img = document.createElement('img');
  			  if( status['printing'].length-1 == i){
            img.className = "printing_image";
  			  } else {
  				  img.className = "queue_image"
  			  }
  			  img.src = "../vPlotterAPI/data/"+queue[i]['file'];
          var rotate = queue[i]['rotate'];
          var scale = queue[i]['scale']*0.01;
          img.style.webkitTransform = "rotate("+rotate+"deg) scale("+scale+","+scale+")";
  			  document.getElementById('queue').appendChild(img);
  		  }
		  }
	 });
}

checkStatus();
setInterval(checkStatus,1000);