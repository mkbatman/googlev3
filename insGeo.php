<?php

require 'include.php';

mysql_pconnect($DBhost,$DBuser,$DBpass);
mysql_select_db("$DBName");

$x2	= $_GET["lat"];
$x3	= $_GET["lng"];

$success = 1;

$ins_str = "INSERT INTO `nearlythere` (`nID` ,`name` ,`lat` ,`lng` )VALUES (NULL , 'michael', '$x2', '$x3');";
 
if (!mysql_query ($ins_str)) {
	$success = 0;
	$msg = 'Problem saving records to the database';
} else {
	$msg = mysql_insert_id();
}


?>