<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "conn.php";

// Mendapatkan data dari parameter URL
$id = isset($_GET['id']) ? $_GET['id'] : '';
$nama = isset($_GET['nama']) ? $_GET['nama'] : '';
$jumlah = isset($_GET['jumlah']) ? $_GET['jumlah'] : '';
if (!empty($id) && !empty($nama) && !empty($jumlah)) {
    // Update data di database berdasarkan parameter yang diberikan
    $query = "UPDATE barang SET nama = '$nama', jumlah = '$jumlah' WHERE idbarang = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Data berhasil diupdate.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal mengupdate data.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Parameter tidak lengkap.'));
}

mysqli_close($conn);
?>
