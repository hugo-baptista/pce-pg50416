from hl7apy.parser import parse_message
from hl7apy.core import Segment, Group, Message

def hl7_read(name):
    file = open(name, "r")
    hl7_msg = file.read()
    parsed_msg = parse_message(hl7_msg.replace("\n","\r"), find_groups=True, validation_level=2)
    for segment in parsed_msg.children:
        if isinstance(segment, Segment):
            for attribute in segment.children:
                print(attribute, attribute.value)
        """if isinstance(segment, Group):
            for group in segment.children:
                for group_segment in group.children:
                    for attribute in group_segment.children:
                        print(attribute, attribute.value)"""

hl7_read(r"FT02\new_hl7.txt")
