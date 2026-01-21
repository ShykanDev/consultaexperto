import os
import re

def find_multiline_string_interpolations(directory):
    pattern = re.compile(r'\{\{[^}]*(\'|")[^}]*\n[^}]*(\'|")[^}]*\}\}', re.MULTILINE)
    pattern2 = re.compile(r'\{\{[^}]*(\'|")[^}]*\n[^}]*\}\}', re.MULTILINE)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.vue'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    match = pattern.search(content) or pattern2.search(content)
                    if match:
                        print(f"File: {path}")
                        # Print the match context
                        start = max(0, match.start() - 20)
                        end = min(len(content), match.end() + 20)
                        print(content[start:end])
                        print("-" * 40)

find_multiline_string_interpolations('src')
