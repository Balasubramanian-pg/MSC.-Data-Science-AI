# The Viterbi algorithm runs under the hood here

pos_tags = nltk.pos_tag(tokens)

print("Token -> Tag Mapping:")
for word, tag in pos_tags:
    print(f"{word:>12} -> {tag}")
