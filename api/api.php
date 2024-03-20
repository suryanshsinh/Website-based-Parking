<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $s1 = $_POST['s1'];
        $s2 = $_POST['s2'];
        $s3 = $_POST['s3'];
        $s4 = $_POST['s4'];
        $s5 = $_POST['s5'];
        $s6 = $_POST['s6'];
        $s6 = str_replace("\r", "", $s6);

        $values = array(
            "s1" => "$s1",
            "s2" => "$s2",
            "s3" => "$s3",
            "s4" => "$s4",
            "s5" => "$s5",
            "s6" => "$s6",
        );

        $slots = fopen('./slots.json', 'w');
        fwrite($slots, json_encode($values));
        fclose($slots);
    }
    else {
        echo "Request in GET Mode";
    }


        // $time = date("H:i:s");
        // $date = date("d-m-Y");

        // try {
        //     $logs = @fopen("Logs_".$date.".csv","r");
        //     if (!$logs) {
        //         throw new Exception('Failed to open file');
        //     }
        //     else {
        //         fclose($logs);
        //     }
        // }
        // catch (Exception $e) {
        //     $logs = fopen("Logs_".$date.".csv", "w");
        //     fwrite($logs, 'time,temperature,humidity,pressure'."\n");
        //     fclose($logs);
        // }
        
        // $temp = $_POST['temperature'];
        // $humi = $_POST['humidity'];
        // $pres = $_POST['pressure'];
        // $pres = str_replace("\r", "", $pres);
        
        // $values = array(
        //     "time" => "$time",
        //     "temperature" => "$temp",
        //     "humidity" => "$humi",
        //     "pressure" => "$pres",
        // );

        // $readings = fopen('Readings.json', 'w');
        // $logs = fopen("Logs_".$date.".csv", 'a');
        // fwrite($readings, json_encode($values)."\n");
        // fclose($readings);
        // fwrite($logs, $values['time'].','.$values['temperature'].','.$values['humidity'].','.$values['pressure']."\n");
        // fclose($logs);