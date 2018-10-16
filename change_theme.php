<?php
$style = $_GET['main'];
setcookie('main',$style, time()+60*60+24*365, '/');
header('C:\4 курс\ОКРЗП\ЛР1\4dev\css\main.css');
?>