
def main():
 [' #', ' p', ' r', ' i', ' n', ' t', ' (', ' f', " '", " '", ' )', '  ', ' l', ' e', ' t', ' s', '  ', ' y', ' o', ' u', '  ', ' p', ' r', ' i', ' n', ' t', '  ', ' v', ' a', ' r', ' i', ' a', ' b', ' l', ' e', ' s', ' :', ' \n', ' \n', ' x', '  ', ' =', '  ', ' 0', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', ' f', " '", ' x', '  ', ' i', ' s', '  ', ' {', ' x', ' }', " '", ' )', ' \n', ' \n', ' #', ' m', ' a', ' k', ' e', '  ', ' s', ' u', ' r', ' e', '  ', ' t', ' o', '  ', ' u', ' s', ' e', '  ', ' {', ' }']
 pass

def correct(code, output):
 awnsers = ['*
']
 include = ['']
 found = {word: False for word in include}
 for line in code.splitlines():
  stripped = line.split('#')[0]
  for word in include:
   if word in stripped:
    found[word] = True
 if not all(found.values()):
  return False
 return output in awnsers
    