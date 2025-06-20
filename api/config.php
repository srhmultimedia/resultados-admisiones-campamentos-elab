<?php
// api/config.php
$db = new PDO(
    'mysql:host=localhost;dbname=proyectoexplora_admissions;charset=utf8mb4',
    'proyectoexplora_adm_user',
    'mwa~mcUX8DMN]@G-',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
