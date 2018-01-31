const regex = /((\d+\s+\d+\s+\d+)|(\d+.\d+\s+\d+.\d+\s+\d+.\d+))/g;
const str = `# Converted from MeteoSwiss NCL library

# number of colors in table
ncolors = 30

#  r   g   b
 109 227 255
 175 240 255
 255 196 226
 255 153 204
 255   0 255
 128   0 128
   0   0 128
  70  70 255
  51 102 255
 133 162 255
 255 255 255
 204 204 204
 179 179 179
 153 153 153
  96  96  96
 128 128   0
   0  92   0
   0 128   0
  51 153 102
 157 213   0
 212 255  91
 255 255   0
 255 184 112
 255 153   0
 255 102   0
 255   0   0
 188  75   0
 171   0  56
 128   0   0
 163 112 255
 0.9930390 0.78913 0.789134789
 0.8901389 1.1313 0.781378913`;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}