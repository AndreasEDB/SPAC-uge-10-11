from datetime import datetime

from client.models import File


def parse_mlsd_line(name, details) -> File:
            # Extract information from MLSD data
            is_dir = details.get("type") == "dir"
            size = int(details.get("size", 0)) if not is_dir else 0
            modified = datetime.strptime(details.get("modify", ""), "%Y%m%d%H%M%S") if "modify" in details else None
            return File(file_name=name, is_dir=is_dir, file_size=size, last_modified=modified)

def parse_list_line(line):
    parts = line.split()
    # Parse permissions and type
    is_dir = parts[0][0] == "d"
    # Parse size and filename
    size = int(parts[4]) if not is_dir else 0
    # Parse last modified time
    date_str = " ".join(parts[5:8])
    modified = datetime.strptime(date_str, "%b %d %H:%M" if ":" in date_str else "%b %d %Y")
    if ':' in date_str:
        modified = datetime(datetime.now().year, modified.month, modified.day, modified.hour, modified.minute)
    
    # Extract filename
    filename = " ".join(parts[8:])
    return File(file_name=filename, is_dir=is_dir, file_size=size, last_modified=modified)