// Config for the javascript part

var urlForPHP 				= "getGEO.php";
var milsecondsTillRepeat 	= 1000;
var idForReplace			= "idForAJAXReplace";

function startRefreshing()
{
	setTimeout("startRefreshing()",milsecondsTillRepeat);
	reloadPHP();
}

/// the following code is based on http://www.w3schools.com/php/php_ajax_database.asp  but I shorted it quite some bit
var xmlhttp;

function reloadPHP()
{
	xmlhttp=GetXmlHttpObject();
	if (xmlhttp==null)
	{
		alert ("Your Browser does not support HTTP Request");
		return;
	}
	var url=urlForPHP;
	url=url+"?random="+Math.random();
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function stateChanged()
{
	if (xmlhttp.readyState==4)
	{
	var l0 = xmlhttp.responseText.split("&")[2];
	var l1 = xmlhttp.responseText.split("&")[3];
	document.getElementById(idForReplace).innerHTML=l0+":"+l1;
	}
}

function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}




