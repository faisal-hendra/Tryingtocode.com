
def main():
 [' #', ' t', ' r', ' y', '  ', ' g', ' e', ' t', ' t', ' i', ' n', ' g', '  ', ' p', ' l', ' a', ' y', ' e', ' r', '  ', ' i', ' n', ' p', ' u', ' t', ' ,', '  ', ' a', ' n', ' d', '  ', ' d', ' o', '  ', ' s', ' o', ' m', ' e', ' t', ' h', ' i', ' n', ' g', '  ', ' w', ' i', ' t', ' h', '  ', ' i', ' t', ' :', ' \n', ' \n', ' i', '  ', ' =', '  ', ' i', ' n', ' p', ' u', ' t', ' )', ' \n', ' \n', ' p', ' r', ' i', ' n', ' t', ' )']
 pass

def correct(code, output):
 awnsers = ['*']
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
    