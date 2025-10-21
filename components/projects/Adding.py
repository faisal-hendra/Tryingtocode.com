
def main():
 [' x', '  ', ' =', '  ', ' 1', ' \n', ' y', '  ', ' =', '  ', ' 1', ' \n', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', ' x', '  ', ' +', '  ', ' y', ' )']
 pass

def correct(code, output):
 awnsers = ['10
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
    