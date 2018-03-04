# -*- coding: utf-8 -*-
import os
import numpy
import spacy
import yaml
import pickle
import heapq

nlp = spacy.load('en')


# def set_dir(newpath="/Users/yuki/Documents/patient_matching"):
#     try:
#         os.chdir(os.path.dirname(os.path.realpath(__file__)))
#     except:
#         os.chdir(newpath)

# set_dir()

# with open('data/newdata.pickled', 'rb') as f:
# 	data = pickle.load(f)

# orig_doc = """
# 	my father has state 4"""

# other_docs = []
# for subreddit in data:
# 	for submission in data[subreddit]:
# 		other_docs.append(submission['selftext'])

# howmany = 5


class Algo:
	"""
	Base class for algorith for matching
	"""
	def __init__(self, orig_doc, other_docs, howmany):
		self.orig_doc = orig_doc
		self.other_docs = other_docs
		self.results = []
		self.howmany = howmany
		self.matched_docs = None

	def get_matched_docs(self):
		idx = heapq.nlargest(self.howmany, enumerate(self.results), key=lambda x:x[1])
		self.matched_docs = [self.other_docs[i] for i, _ in idx]

class doc_similarity(Algo):
	"""
	Ducument similarity
	- encode a document's internal meaning representations based on its surrounding words
	- Even if a word hasn't been seen before, spaCy will know something about it by CNN sensitive to up to four words on either side
	- whole doc level all words and their order are taken into account
	"""
	def __init__(self, orig_doc, other_docs, howmany):
		super().__init__(orig_doc, other_docs, howmany)
		self.run()
		self.get_matched_docs()

	def run(self):
		doc = nlp(self.orig_doc)
		for other_doc in self.other_docs:
			self.results.append(doc.similarity(nlp(other_doc)))
		
