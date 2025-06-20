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

$stmt = $db->prepare('SELECT nombre, admitido FROM students WHERE documento = ? LIMIT 1');
$stmt->execute([$doc]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo json_encode(['status' => 'not_found', 'message' => 'Documento no registrado']);
    exit;
}

if ($row['admitido'] === 'SI') {
    $mensaje = '🎉 Felicitaciones ' . $row['nombre'] . ', has sido admitido';

    echo json_encode([
        'status'  => 'admitido',
        'message' => $mensaje,
        'nombre'  => $row['nombre']
    ]);
    exit;
} else {
    $mensaje = 'Lo sentimos ' . $row['nombre'] . ', no has sido admitido. Puedes intentarlo en la próxima convocatoria.';
    echo json_encode([
        'status'  => 'revision',
        'message' => $mensaje,
        'nombre'  => $row['nombre']
    ]);
}
