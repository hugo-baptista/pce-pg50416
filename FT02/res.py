from hl7apy.parser import parse_message
from hl7apy.core import Segment, Message

def hl7_read(name):
    file = open(name, "r")
    hl7_msg = file.read()
    parsed_msg = parse_message(hl7_msg.replace("\n","\r"), find_groups=True, validation_level=2)

    for child in parsed_msg.children:
        if isinstance(child,Segment):
            #print(child.value)
            for grandchild in child.children:
                print(grandchild, grandchild.value)

hl7_read(r"FT02\new_hl7.txt")

