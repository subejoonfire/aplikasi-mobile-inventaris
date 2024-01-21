<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "conn.php";

// Ambil nilai id dari query string
$id = isset($_GET['id']) ? $_GET['id'] : '';

if (!empty($id)) {
    // Hapus data di database berdasarkan idbarang
    $query = "DELETE FROM barang WHERE idbarang = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Data berhasil dihapus.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal menghapus data.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Parameter tidak lengkap.']);
}

mysqli_close($conn);

?>
