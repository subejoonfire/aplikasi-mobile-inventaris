<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include "conn.php";

// Assuming your table name is 'barang'
$query = "SELECT * FROM barang";
$result = mysqli_query($conn, $query);

if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Gagal mengambil data.'));
}

mysqli_close($conn);
?>
