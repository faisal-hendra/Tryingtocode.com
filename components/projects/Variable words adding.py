
def main():
 [' #', ' y', ' o', ' u', '  ', ' c', ' a', ' n', '  ', ' a', ' d', ' d', '  ', ' w', ' o', ' r', ' d', ' s', '  ', ' t', ' o', ' g', ' e', ' t', ' h', ' e', ' r', ' \n', ' \n', ' x', '  ', ' =', '  ', " '", ' a', ' p', ' p', ' l', ' e', '  ', ' a', ' n', ' d', '  ', " '", ' \n', ' y', '  ', ' =', '  ', " '", ' o', ' r', ' a', ' n', ' g', ' e', '  ', " '", ' \n', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', ' x', '  ', ' +', '  ', ' y', ' )']
 pass

def correct(code, output):
 awnsers = ['apple and apple and orange orange 
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
    