function ajaxcall (methodType, url, async = true, data = null) {
    return new Promise((resolve,reject) => {
        var xmlhttp = new XMLHttpRequest();     
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if ( xmlhttp.status >= 200 && xmlhttp.status < 300 ) {
                    resolve(xmlhttp.responseText);
                }
                else {
                    reject("Failure response");
                }
            }
        }
        xmlhttp.open(methodType, url, async);
        if(data) {
            xmlhttp.setRequestHeader("Content-Type","application/json");
            xmlhttp.send(JSON.stringify(data));
        } 
        else {
            xmlhttp.send();
        }
    });
}