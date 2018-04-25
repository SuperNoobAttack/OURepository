<?php 
    $cwd[__FILE__] = __FILE__;
    if (is_link($cwd[__FILE__])) $cwd[__FILE__] = readlink($cwd[__FILE__]);
    $cwd[__FILE__] = dirname($cwd[__FILE__]); 
    require_once($cwd[__FILE__] . "/../db/my_query.php");

    $re = '/((\d+\s+\d+\s+\d+)|(\d+.\d+\s+\d+.\d+\s+\d+.\d+))/';
    $dataFilePath = "/home/jlongar/ourepository/www/rgb_script_data/" . $_FILES['file']['name'];
    $jsFileLoc = "/home/jlongar/ourepository/www/js/rgb_scripts/" . $_FILES['file']['name'] . ".js"; 
    //$jsFileLoc = "js/rgb_scripts/" . $_FILES['file']['name'];
    $filename = $_FILES['file']['name'];
    $uploaddir = "rgb_script_data/" . $_FILES['file']['name'];
    $str = file_get_contents($uploaddir);

        if (is_uploaded_file($_FILES['file']['tmp_name'])) {
            echo "File ". $_FILES['file']['name'] ." uploaded successfully.\n";
        } 
        else 
        {
            echo "The following file was not uploaded correctly";
            echo "filename '". $_FILES['userfile']['tmp_name'] . "'.";
        }

        if ( 0 < $_FILES['file']['error'] ) 
        {
                echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        }
        else 
        {
            if(move_uploaded_file($_FILES['file']['tmp_name'], $uploaddir))
            {
                //echo "The upload file was moved successfully!!!";
            }
            else
            {
                echo "move_uploaded_file() failed. File was not moved from temporary path";
            }
        }

    preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);
    
    $colorCount = count($matches) . "\n";
    //$jsFileStream = fopen($jsFileLoc, "w");
    $firstLine = "var lookup = [ " . "\n";
    //file_put_contents($jsFileLoc, $firstLine);

    //I may need to add a value to the "array" function so it compiles
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
    //echo $otherLine;

$query = "INSERT INTO rgb_files (owner_id, rgb_file_info, filename) VALUES('5', '$otherLine', '$filename');";
//$query = "INSERT INTO rgb_files SET owner_id = 3, rgb_file = '$color_val_array', filename = '$filename'";
error_log($query);
query_our_db($query);
?>
