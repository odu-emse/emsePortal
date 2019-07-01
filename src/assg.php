<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';
require_once '../build/components/fn.php';

loginCheck();
search($conn);

include_once '../build/components/nav.php';

?>