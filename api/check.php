<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
$doc   = $input['documento'] ?? '';

if (!preg_match('/^\d{6,15}$/', $doc)) {
    http_response_code(400);
    echo json_encode(['error' => 'Documento inválido']);
    exit;
}

$stmt = $db->prepare('SELECT nombre, admitido, grado FROM students WHERE documento = ? LIMIT 1');
$stmt->execute([$doc]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo json_encode(['status' => 'not_found', 'message' => 'Documento no registrado']);
    exit;
}

$msg_no_admitido= if ($row['grado'] === 'Décimo') {
    $row['nombre']. 'no fuiste admitido. Puedes intentarlo de nuevo en la próxima vigencia.';
} else {
    $row['nombre']. 'Lo sentimos, no fuste admitido.';
}


if ($row['admitido'] === 'SI') {
    echo json_encode([
        'status'  => 'admitido',
        'message' => "🎉 Felicitaciones {$row['nombre']}, has sido admitid@",
        'nombre'  => $row['nombre']
    ]);
} else {
    echo json_encode([
        'status'  => 'revision',
        'message' => $msg_no_admitido,
        'nombre'  => $row['nombre']
    ]);
}
