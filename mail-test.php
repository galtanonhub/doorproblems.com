<?php
// Temporary debug file — DELETE after testing
$to      = 'galtanon@protonmail.com';
$subject = 'Mail test from DoorProblems.com server';
$body    = 'If you see this, PHP mail() is working correctly. Time: ' . date('Y-m-d H:i:s');
$headers = "From: help@doorproblems.com\r\nContent-Type: text/plain; charset=UTF-8\r\n";

$result = mail($to, $subject, $body, $headers);

// Also log to a file on the server
$log = date('Y-m-d H:i:s') . " mail() returned: " . ($result ? 'TRUE' : 'FALSE') . "\n";
file_put_contents(__DIR__ . '/mail-test.log', $log, FILE_APPEND);

echo $result ? 'mail() returned TRUE — check your inbox' : 'mail() returned FALSE — PHP mail is disabled or broken';
