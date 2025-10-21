
def main():
 [' i', '  ', ' =', '  ', ' i', ' n', ' p', ' u', ' t', ' (', " '", ' i', ' :', '  ', " '", ' )', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', " '", " '", ' )', ' \n', ' j', '  ', ' =', '  ', ' i', ' n', ' p', ' u', ' t', ' (', " '", ' j', ' :', '  ', " '", ' )', ' \n', ' \n', ' p', ' r', ' i', ' n', ' t', ' (', ' i', '  ', ' +', '  ', ' j', ' )']
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
    