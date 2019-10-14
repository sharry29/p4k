x = [w.lower() for w in x]

# THE SAME
l = []
for w in x:
	l.append(w.lower())

x = [w for w in x if not w.isdigit()]

q = ["hi", "i", "am"]
" ".join(q) #=> "hi i am"