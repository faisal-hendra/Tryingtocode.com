
def main():
 [' #', ' t', ' h', ' i', ' s', '  ', ' i', ' s', '  ', ' a', '  ', ' c', ' o', ' m', ' m', ' e', ' n', ' t', ' \n', ' \n', ' #', ' c', ' o', ' m', ' m', ' e', ' n', ' t', ' s', '  ', ' d', ' o', ' n', " '", ' t', '  ', ' a', ' c', ' t', ' u', ' a', ' l', ' l', ' y', '  ', ' d', ' o', '  ', ' a', ' n', ' y', ' t', ' h', ' i', ' n', ' g', ' \n', ' #', ' t', ' h', ' e', ' y', '  ', ' a', ' r', ' e', '  ', ' j', ' u', ' s', ' t', '  ', ' f', ' o', ' r', '  ', ' d', ' e', ' v', ' e', ' l', ' o', ' p', ' e', ' r', ' s', ' \n', ' \n']
 pass

def correct(code, output):
 awnsers = ['']
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
    