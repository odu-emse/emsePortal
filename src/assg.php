<?php
session_start();

require_once 'components/header.php';
require_once 'components/globals.php';
require_once 'components/fn.php';

loginCheck();
search($conn);

include_once 'components/nav.php';

?>