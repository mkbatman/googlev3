<?php

require 'include.php';

mysql_pconnect($DBhost,$DBuser,$DBpass);
mysql_select_db("$DBName");
 
$qrZ = mysql_query("SELECT * FROM `nearlythere` WHERE `nID`='1'");

$r_string = '';
$i = 0;
$doonce = false;

while ($rowZ = mysql_fetch_assoc ($qrZ)) {
  while (list ($key, $val) = each ($rowZ)) {
	$sep = ($doonce) ? '&' : '';
    $r_string .= $sep . urlencode($val) ;
	$doonce = true;
  }
  $i++;
}

echo $r_string;

?>

