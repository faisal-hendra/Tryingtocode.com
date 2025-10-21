
def main():
 [' d', ' e', ' f', '  ', ' m', ' y', ' _', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' (', ' p', ' a', ' r', ' a', ' m', ' e', ' t', ' e', ' r', ' )', ' :', ' \n', '  ', ' p', ' r', ' i', ' n', ' t', ' (', ' p', ' a', ' r', ' a', ' m', ' e', ' t', ' e', ' r', ' )', ' \n', ' \n', ' m', ' y', ' _', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' (', " '", ' h', ' e', ' l', ' l', ' o', '  ', ' w', ' o', ' r', ' l', ' d', " '", ' )']
 pass

def correct(code, output):
 awnsers = ['hello world
hello world
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
    