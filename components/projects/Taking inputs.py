
def main():
 [' #', ' t', ' r', ' y', '  ', ' t', ' y', ' p', ' i', ' n', ' g', '  ', ' w', ' h', ' a', ' t', ' e', ' v', ' e', ' r', '  ', ' y', ' o', ' u', '  ', ' w', ' a', ' n', ' t', '  ', ' >', ' \n', ' \n', ' i', '  ', ' =', '  ', ' i', ' n', ' p', ' u', ' t', ' (', " '", ' t', ' y', ' p', ' e', '  ', ' h', ' e', ' r', ' e', ' :', '  ', " '", ' )', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', ' i', ' )']
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
    