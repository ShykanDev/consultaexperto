import os
import re

def find_multiline_string_interpolations(directory):
    # Pattern for single or double quote strings that span multiple lines inside {{ }}
    # This is rough but should catch the "Unterminated string literal" cases
    pattern = re.compile(r'\{\{[^}]*(\'|")[^}]*\n[^}]*(\'|")[^}]*\}\}', re.MULTILINE)
    
    # Also catch cases where the quote is never closed before }}
    pattern2 = re.compile(r'\{\{[^}]*(\'|")[^}]*\n[^}]*\}\}', re.MULTILINE)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.vue'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if pattern.search(content) or pattern2.search(content):
                        print(f"File found: {path}")

find_multiline_string_interpolations('src')
