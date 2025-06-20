<?php
// api/config.php
$db = new PDO(
    'mysql:host=localhost;dbname=admissions;charset=utf8mb4',
    'adm_user',
    'mwa~mcUX8DMN]@G-',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
