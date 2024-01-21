<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "conn.php";

$nama = isset($_GET['nama']) ? $_GET['nama'] : '';
$jumlah = isset($_GET['jumlah']) ? $_GET['jumlah'] : '';

if (!empty($nama) && !empty($jumlah)) {
    // Insert data into the database
    $query = "INSERT INTO barang (nama, jumlah) VALUES ('$nama', '$jumlah')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(array('status' => 'success', 'message' => 'Data berhasil ditambahkan.'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Gagal menambahkan data ke database.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Semua data harus diisi.'));
}

mysqli_close($conn);
?>
