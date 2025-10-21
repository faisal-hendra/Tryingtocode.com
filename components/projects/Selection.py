
def main():
 [' f', ' r', ' u', ' i', ' t', '  ', ' =', '  ', ' i', ' n', ' p', ' u', ' t', ' (', " '", ' o', ' r', ' a', ' n', ' g', ' e', '  ', ' (', ' o', ' )', '  ', ' a', ' p', ' p', ' l', ' e', '  ', ' (', ' a', ' )', ' :', " '", ' )', ' \n', ' \n', ' i', ' f', '  ', ' f', ' r', ' u', ' i', ' t', '  ', ' =', ' =', '  ', " '", ' o', " '", ' :', ' \n', '  ', ' p', ' r', ' i', ' n', ' t', ' (', " '", ' o', ' r', ' a', ' n', ' g', ' e', '  ', ' i', ' s', '  ', ' g', ' o', ' o', ' d', " '", ' )', ' \n', ' i', ' f', '  ', ' f', ' r', ' u', ' i', ' t', '  ', ' =', ' =', '  ', " '", ' a', " '", ' :', ' \n', '  ', ' p', ' r', ' i', ' n', ' t', ' (', " '", ' a', ' p', ' p', ' l', ' e', '  ', ' i', ' s', '  ', ' g', ' o', ' o', ' d', " '", ' )']
 pass

def correct(code, output):
 awnsers = ['apple is good
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
    