import csv 
import codecs
line_num = 0
with open(r'yxu-k6mlx.github.io\data\csv\twtelegraph.csv', mode='r') as mainlandCodes: 
    cn_codes = csv.reader(mainlandCodes)
    for lines in cn_codes: 
        unicode_raw = lines[0]
        num_code = lines[1]
        string = bytes(unicode_raw, "ascii").decode("unicode-escape")
        
        print(string)
        print(num_code)
        