
def main():
 [' #', ' w', ' e', '  ', ' c', ' a', ' n', '  ', ' m', ' a', ' k', ' e', '  ', ' o', ' u', ' r', '  ', ' o', ' w', ' n', '  ', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' s', ' !', ' \n', ' #', ' p', ' r', ' i', ' n', ' t', ' (', ' )', '  ', ' a', ' n', ' d', '  ', ' i', ' n', ' p', ' u', ' t', ' (', ' )', '  ', ' a', ' r', ' e', '  ', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' s', ' \n', ' \n', ' d', ' e', ' f', '  ', ' m', ' y', ' _', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' (', ' )', ' :', ' \n', '  ', ' p', ' r', ' i', ' n', ' t', ' (', " '", ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' !', " '", ' )', ' \n', ' \n', ' #', ' t', ' o', '  ', ' c', ' a', ' l', ' l', '  ', ' t', ' h', ' i', ' s', '  ', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' ,', '  ', ' s', ' a', ' y', '  ', ' \n', ' m', ' y', ' _', ' f', ' u', ' n', ' c', ' t', ' i', ' o', ' n', ' (', ' )']
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
    