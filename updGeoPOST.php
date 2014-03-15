<?php

require 'include.php';

mysql_pconnect($DBhost,$DBuser,$DBpass);
mysql_select_db("$DBName");

$x2	= $_POST["lat"];
$x3	= $_POST["lng"];

$success = 1;

$ins_str = "UPDATE `nearlythere` SET `lat` = '$x2' ,`lng` = '$x3' WHERE `nID` = 1;";
 
if (!mysql_query ($ins_str)) {
	$success = 0;
	$msg = 'Problem saving records to the database';
} else {
	$msg = "res=successful";
}

echo $msg;
?>