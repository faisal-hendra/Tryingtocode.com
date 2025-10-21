
def main():
 [' x', '  ', ' =', '  ', ' 1', ' \n', ' i', ' f', '  ', ' x', '  ', ' =', ' =', '  ', ' 1', ' :', ' \n', '  ', ' p', ' r', ' i', ' n', ' t', ' (', " '", ' x', '  ', ' i', ' s', '  ', ' o', ' n', ' e', " '", ' )', ' \n', ' e', ' l', ' s', ' e', ' :', ' \n', '  ', ' p', ' r', ' i', ' n', ' t', ' (', " '", ' x', '  ', ' i', ' s', '  ', ' n', ' o', ' t', '  ', ' o', ' n', ' e', " '", ' )']
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
    