from hl7apy.parser import parse_message
from hl7apy.core import Segment, Message
import hl7apy

msg = Message("ADT_A01", version="2.5")
msg.msh.msh_3 = str(input(str(msg.msh.msh_3).split(" ")[2] + ": "))


print(f"\n{1:-^51}")
print(msg.to_er7())
print(f"\n{2:-^51}")
for child in msg.children:
    print(child, child.value)
print(f"\n{3:-^51}")
for child in msg.children:
    for grandchild in child.children:
        print(grandchild, grandchild.value)
print(f"\n{4:-^51}")
print(msg.msh.msh_3)
print(str(msg.msh.msh_3).split(" ")[2])
print("")