
def main():
 [' i', ' m', ' p', ' o', ' r', ' t', '  ', ' t', ' i', ' m', ' e', ' \n', ' \n', ' t', ' i', ' m', ' e', ' .', ' s', ' l', ' e', ' e', ' p', ' (', ' 1', ' )', ' \n', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', " '", ' w', ' a', ' i', ' t', ' e', ' d', '  ', ' o', ' n', ' e', '  ', ' s', ' e', ' c', ' o', ' n', ' d', " '", ' )']
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
    