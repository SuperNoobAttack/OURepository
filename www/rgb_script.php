<?php 
    $cwd[__FILE__] = __FILE__;
    if (is_link($cwd[__FILE__])) $cwd[__FILE__] = readlink($cwd[__FILE__]);
    $cwd[__FILE__] = dirname($cwd[__FILE__]); 
    require_once($cwd[__FILE__] . "/../db/my_query.php");
    
    function upload_rgb_file($user_id, $file_data, $filename) { 
        global $our_db, $cwd;

//        $query = "SELECT id FROM rgb_files (owner_id, filename) VALUES($user_id, $filename)";
//        error_log($query);
//        $result = query_our_db($query);
//        $row = $result->fetch_assoc();
//        if ($row != NULL) {
//            $response['err_title'] = "Create RGB File Error";
//            $response['err_msg'] = "Could not upload the RGB file '$label_name' as it already exist for this user";
//
//            echo json_encode($response);
//            return;
//        }
        $re = '/((\d+\s+\d+\s+\d+)|(\d+.\d+\s+\d+.\d+\s+\d+.\d+))/';
        $str = $file_data;

        preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);
        
        $colorCount = count($matches) . "\n";
        $firstLine = "var lookup = [ " . "\n";

        $color_val_array = array();
        for($i = 0; $i < $colorCount; $i++)
        {
            $line = $matches[$i][0];
            $parts = preg_split('/\s+/', $line);
            $finalLine = $parts[0] . "," . $parts[1] . "," . $parts[2] . "\n";
            //needed to cast as an int since "count()" doesn't convert to int automatically
            $colorCount = (int) $colorCount;
            $otherLine .= $finalLine;
        }

        $query = "INSERT INTO rgb_files (owner_id, rgb_file_info, filename) VALUES($user_id, '$otherLine', '$filename');";
        error_log($query);
        query_our_db($query);

        $id = $our_db->insert_id;

        $response['id'] = $id;
        $response['filename'] = $filename;
        $response['otherLine'] = $otherLine;
    }
?>
