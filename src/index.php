<?php
session_start();

$metaImport = simplexml_load_file("output/meta.xml") or die("Error: Cannot create object");
echo $metaImport->project['title'] . "<br>";
echo $metaImport->project[0]->application['name'] . "<br>";
?>

<a href="output/story_html5.html">this is the link</a>