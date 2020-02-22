
<?php
// connect to database
$con = new mysqli("localhost", "root", "", "firef");
$sql = mysqli_query($con, "SELECT  longitude,latitude,url FROM objects ");
$rows = array();
while ($row = mysqli_fetch_assoc($sql)) {
    $rows[] = $row;
}
if ($_SERVER['REQUEST_METHOD'] == "GET") { echo json_encode($rows,JSON_NUMERIC_CHECK); }
?>
