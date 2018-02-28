<?php 
    $re = '/((\d+\s+\d+\s+\d+)|(\d+.\d+\s+\d+.\d+\s+\d+.\d+))/';
    //both of these will need to be change to be more dynamicc
    $dataFilePath = "/home/jlongar/ourepository/www/rgb_script_data/GMT_seis.rgb";
    $jsFileLoc = "/home/jlongar/ourepository/www/js/rgb_scripts/GMT_seis.js";
    $str = file_get_contents($dataFilePath);

        if ( 0 < $_FILES['file']['error'] ) 
        {
                echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        }
        else 
        {
            if(move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']))
            {
                echo "The upload file was moved successfully!!!";
            }
            else
            {
                echo "The upload file was nove moved.";
            }
        }

    preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);
    
    $colorCount = count($matches) . "\n";
    $jsFileStream = fopen($jsFileLoc, "w");
    $firstLine = "var lookup = [ " . "\n";
    file_put_contents($jsFileLoc, $firstLine);
    for($i = 0; $i < $colorCount; $i++)
    {
        $line = $matches[$i][0];
        $parts = preg_split('/\s+/', $line);
        $finalLine = "[" . $parts[0] . "," . $parts[1] . "," . $parts[2] . "]";
        //needed to cast as an int since "count()" doesn't convert to int automatically
        $colorCount = (int) $colorCount;
        if ($i == $colorCount - 1)
        {
           $finalLine = $finalLine . "\n ];\n"; 
        }
        else
        {
            $finalLine = $finalLine . ",\n";
        }
        file_put_contents($jsFileLoc, $finalLine, FILE_APPEND | LOCK_EX); 
    }
    $lastLine = "function colortable(n) {
    var pixel = {
         r: lookup[n][0],
         g: lookup[n][1],
         b: lookup[n][2]
     };

     return pixel;
}";
    file_put_contents($jsFileLoc, $lastLine, FILE_APPEND);
    //potentially add this information to a database, or put a print 
    //statement here letting the user know if this code
    //worked correctly or not.
?>
