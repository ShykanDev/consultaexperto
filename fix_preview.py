import os

path = 'src/views/ExpertPreview.vue'
with open(path, 'rb') as f:
    content = f.read()

# Replace the specific multi-line sequence with single line
# I will use hex for safety if possible or just broad bytes
bad_sequence = b"'Sin biogr"
# Let's just rewrite the specific lines based on line numbers
lines = content.splitlines()
lines[45] = b"        <p class=\"text-gray-600 leading-relaxed\">{{ expertAdminStore.getCurrentExpert?.bio || 'Sin biografia disponible.' }}</p>"
# Wait, line 46 and 47 are lines[45] and lines[46] in 0-indexed
# But I should probably just do a regex replace on the whole content
content = content.replace(b"'Sin biogra\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd a\n          disponible.'", b"'Sin biografia disponible.'")
# Or simpler:
import re
content = re.sub(b"\{\{[^}]*Sin biogra[^}]*\}\}", b"{{ expertAdminStore.getCurrentExpert?.bio || 'Sin biografia disponible.' }}", content, flags=re.DOTALL)

with open(path, 'wb') as f:
    f.write(content)
