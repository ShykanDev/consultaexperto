import os
import re

def fix_multiline_string_interpolations(directory):
    # Pattern for single or double quote strings that span multiple lines inside {{ }}
    # We'll replace the newline and surrounding spaces with a single space
    pattern = re.compile(r'(\{\{[^}]*?)(\'|")([^}]*)\n\s*([^}]*?)(\'|")([^}]*?\}\})', re.MULTILINE)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.vue'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                new_content = pattern.sub(r'\1\2\3 \4\5\6', content)
                
                # Iterate until no more matches (for multiple multiline strings in one interpolation)
                while new_content != content:
                    content = new_content
                    new_content = pattern.sub(r'\1\2\3 \4\5\6', content)

                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed: {path}")

fix_multiline_string_interpolations('src')
